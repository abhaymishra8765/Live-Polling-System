import React, { useEffect, useState } from 'react'
import { socket } from '../socket'

export default function TeacherPage(){
  const [sessionId, setSessionId] = useState('');
  const [teacherName, setTeacherName] = useState('Teacher');
  const [students, setStudents] = useState([]);
  const [poll, setPoll] = useState(null);
  const [partial, setPartial] = useState(null);

  useEffect(()=>{
    socket.on('students:update', (list)=> setStudents(list));
    socket.on('poll:started', ({ poll }) => { setPoll(poll); setPartial(null); });
    socket.on('poll:partialResults', data => setPartial(data));
    socket.on('poll:ended', data => { setPartial(data); setPoll(null); });
    socket.on('session:closed', ()=> { alert('Session closed'); setSessionId(''); setStudents([]); setPoll(null); });
    return () => {
      socket.off('students:update');
      socket.off('poll:started');
      socket.off('poll:partialResults');
      socket.off('poll:ended');
      socket.off('session:closed');
    };
  }, []);

  function createSession(){
    socket.emit('teacher:createSession', { teacherName }, res => {
      if (res?.sessionId) setSessionId(res.sessionId);
    });
  }

  function createPoll(form){
    const { question, rawOptions, duration } = form;
    const options = rawOptions.filter(Boolean);
    if (!question || options.length < 2) return alert('Question + at least 2 options');
    socket.emit('teacher:createPoll', { sessionId, question, options, durationSec: Number(duration) }, res=>{
      if (res?.error) alert(res.error);
    });
  }

  function removeStudent(socketId){
    socket.emit('teacher:removeStudent', { sessionId, targetSocketId: socketId }, res => {
      if (res?.error) alert(res.error);
    });
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-10">
      {/* small badge like Figma */}
      <div className="flex justify-start mb-6">
        <div className="badge-pill inline-flex items-center gap-2">
          <span className="badge-icon" aria-hidden>
            {/* keep existing svg or a small dot */}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="5" r="5" fill="white" opacity="0.9"/>
            </svg>
          </span>
          <span className="badge-text">Intervue Poll</span>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Teacher</h3>

      {!sessionId ? (
        <div className="space-y-4">
          <input
            value={teacherName}
            onChange={e=>setTeacherName(e.target.value)}
            placeholder="Your name"
            className="input-default w-full max-w-sm"
          />
          <button
            className="btn-primary"
            onClick={createSession}
          >
            Create Session
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4"><strong>Session ID:</strong> <span className="font-medium">{sessionId}</span> <small className="text-gray-500">(share with students)</small></p>

          {/* grid: left = form, right = students */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <CreatePollForm onCreate={createPoll} disabled={!!poll} />
            </div>

            <aside className="w-full lg:w-72">
              <h4 className="text-lg font-semibold mb-3">Students ({students.length})</h4>
              <ul className="space-y-3">
                {students.map(s => (
                  <li key={s.socketId} className="flex justify-between items-center gap-3 p-3 bg-white rounded-md shadow-sm">
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-sm text-gray-500">{s.answered ? 'Answered' : 'Not answered'}</div>
                    </div>
                    <div>
                      <button className="btn-ghost" onClick={()=>removeStudent(s.socketId)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-3">Live Results</h4>
            {partial ? (
              <div className="space-y-3">
                {partial.options.map((o, i)=> (
                  <div key={i} className="flex justify-between">
                    <div>{o.text}</div>
                    <div className="font-medium">{o.count} votes</div>
                  </div>
                ))}
              </div>
            ) : <div className="text-gray-600">No active results yet</div>}
          </div>
        </div>
      )}
    </div>
  );
}

function CreatePollForm({ onCreate, disabled }){
  const [question, setQuestion] = useState('');
  const [rawOptions, setRawOptions] = useState(['','']);
  const [duration, setDuration] = useState(60);

  function setOption(i, v){
    setRawOptions(prev => { const copy = [...prev]; copy[i] = v; return copy; });
  }
  function addOption(){ setRawOptions(prev => [...prev, '']); }
  function removeOption(i){ setRawOptions(prev => prev.filter((_, idx)=>idx!==i)); }

  function submit(){
    onCreate({ question, rawOptions, duration });
    setQuestion('');
    setRawOptions(['','']);
    setDuration(60);
  }

  return (
    <div>
      <label className="block mb-2">Enter your question</label>
      <textarea
        value={question}
        onChange={e=>setQuestion(e.target.value)}
        className="textarea-question"
        placeholder="Type your poll question here..."
      />

      <div style={{marginTop:8}}>
        {rawOptions.map((opt,i)=>(
          <div key={i} style={{display:'flex', gap:8, marginBottom:6}}>
              <input
              placeholder={`Option ${i+1}`}
              value={opt}
              onChange={e=>setOption(i, e.target.value)}
              className="input-default"
            />

            {rawOptions.length > 2 && <button onClick={()=>removeOption(i)}>x</button>}
          </div>
        ))}
        <button onClick={addOption}>Add option</button>
      </div>
      <div style={{marginTop:8}}>
        <label>Duration (sec)</label> <input
            type="number"
            value={duration}
            onChange={e=>setDuration(e.target.value)}
            className="input-default"
            style={{width:100}}
          />

      </div>
      <div style={{marginTop:10}}>
      <button className="btn-primary" onClick={submit} disabled={disabled}>
          Create Poll
      </button>

      </div>
    </div>
  );
}
