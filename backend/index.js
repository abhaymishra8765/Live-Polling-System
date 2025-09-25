const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.get('/', (req, res) => res.send('Polling backend OK'));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const sessions = {}; // in-memory sessions store

function getStudentList(s) {
  return Object.entries(s.students).map(([socketId, st]) => ({ socketId, name: st.name, answered: st.answered }));
}
function allStudentsAnswered(s) {
  const arr = Object.values(s.students);
  if (arr.length === 0) return true;
  return arr.every(st => st.answered);
}
function finishPoll(sessionId) {
  const s = sessions[sessionId];
  if (!s || !s.poll) return;
  io.to(sessionId).emit('poll:ended', { options: s.poll.options, totalAnswered: s.poll.totalAnswered });
  // reset answered flags
  Object.values(s.students).forEach(st => st.answered = false);
  s.poll = null;
}

io.on('connection', socket => {
  console.log('socket connected', socket.id);

  socket.on('teacher:createSession', ({ teacherName } = {}, cb) => {
    const sessionId = uuidv4().slice(0,8);
    sessions[sessionId] = { teacherSocketId: socket.id, teacherName: teacherName || 'Teacher', poll: null, students: {} };
    socket.join(sessionId);
    cb && cb({ sessionId });
    console.log('session created', sessionId);
  });

  socket.on('student:join', ({ sessionId, name } = {}, cb) => {
    const s = sessions[sessionId];
    if (!s) return cb && cb({ error: 'Session not found' });
    s.students[socket.id] = { name: name || 'Anonymous', answered: false };
    socket.join(sessionId);
    io.to(sessionId).emit('students:update', getStudentList(s));
    cb && cb({ ok: true });
    console.log(`student ${name} joined ${sessionId}`);
  });

  socket.on('teacher:createPoll', ({ sessionId, question, options, durationSec } = {}, cb) => {
    const s = sessions[sessionId];
    if (!s) return cb && cb({ error: 'Session not found' });
    if (s.poll && !allStudentsAnswered(s)) return cb && cb({ error: 'Previous poll is still in progress' });
    const poll = {
      id: uuidv4().slice(0,8),
      question,
      options: options.map(o => ({ text: o, count: 0 })),
      totalAnswered: 0,
      durationSec: durationSec || 60,
      startedAt: Date.now()
    };
    s.poll = poll;
    poll.timerId = setTimeout(() => finishPoll(sessionId), poll.durationSec * 1000);
    io.to(sessionId).emit('poll:started', { poll: { id: poll.id, question: poll.question, options: poll.options, durationSec: poll.durationSec } });
    cb && cb({ ok: true });
    console.log(`poll started in ${sessionId}`);
  });

  socket.on('student:submit', ({ sessionId, pollId, optionIndex } = {}, cb) => {
    const s = sessions[sessionId];
    if (!s || !s.poll) return cb && cb({ error: 'No active poll' });
    if (s.poll.id !== pollId) return cb && cb({ error: 'Poll id mismatch' });
    const stud = s.students[socket.id];
    if (!stud) return cb && cb({ error: 'Not joined' });
    if (stud.answered) return cb && cb({ error: 'Already answered' });
    if (optionIndex < 0 || optionIndex >= s.poll.options.length) return cb && cb({ error: 'Invalid option' });

    s.poll.options[optionIndex].count += 1;
    s.poll.totalAnswered += 1;
    stud.answered = true;

    io.to(sessionId).emit('poll:partialResults', { options: s.poll.options, totalAnswered: s.poll.totalAnswered });

    if (allStudentsAnswered(s)) {
      clearTimeout(s.poll.timerId);
      finishPoll(sessionId);
    }
    cb && cb({ ok: true });
  });

  socket.on('teacher:removeStudent', ({ sessionId, targetSocketId } = {}, cb) => {
    const s = sessions[sessionId];
    if (!s) return cb && cb({ error: 'Session not found' });
    if (s.students[targetSocketId]) delete s.students[targetSocketId];
    io.to(sessionId).emit('students:update', getStudentList(s));
    io.to(targetSocketId).emit('kicked');
    cb && cb({ ok: true });
  });

  socket.on('disconnect', () => {
    for (const [sessionId, s] of Object.entries(sessions)) {
      if (s.teacherSocketId === socket.id) {
        // teacher disconnected — close session
        delete sessions[sessionId];
        io.to(sessionId).emit('session:closed');
      }
      if (s.students[socket.id]) {
        delete s.students[socket.id];
        io.to(sessionId).emit('students:update', getStudentList(s));
      }
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log('Listening on', PORT));
