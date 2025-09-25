import React, { useEffect, useState } from 'react'
import { socket } from '../socket'

export default function StudentPage(){
  const [sessionId, setSessionId] = useState('');
  const [name, setName] = useState('');
  const [joined, setJoined] = useState(false);
  const [activePoll, setActivePoll] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [results, setResults] = useState(null);

  useEffect(()=>{
    socket.on('poll:started', ({ poll }) => {
      setActivePoll(poll);
      setResults(null);
      setTimeLeft(poll.durationSec);
    });
    socket.on('poll:partialResults', data => setResults(data));
    socket.on('poll:ended', data => { setActivePoll(null); setResults(data); setTimeLeft(0); });
    socket.on('kicked', () => { alert('Removed by teacher'); setJoined(false); setSessionId(''); setName(''); });
    return ()=> {
      socket.off('poll:started'); socket.off('poll:partialResults'); socket.off('poll:ended'); socket.off('kicked');
    };
  }, []);

  useEffect(()=>{
    let t;
    if (timeLeft > 0) {
      t = setInterval(()=> setTimeLeft(v => v > 0 ? v-1 : 0), 1000);
    }
    return ()=> clearInterval(t);
  }, [timeLeft]);

  function join() {
    if (!sessionId || !name) return alert('Enter session id and your name');
    // store per-tab unique name
    sessionStorage.setItem(`poll_name_${sessionId}`, name);
    socket.emit('student:join', { sessionId, name }, res => {
      if (res?.error) return alert(res.error);
      setJoined(true);
    });
  }

  function submit(optionIndex) {
    if (!activePoll) return;
    socket.emit('student:submit', { sessionId, pollId: activePoll.id, optionIndex }, res=>{
      if (res?.error) alert(res.error);
      else setResults(null); // waiting for results
    });
  }

  return (
    <div style={{maxWidth:760}}>
      <h3>Student</h3>
      {!joined ? (
        <div>
          <input placeholder="Session ID" value={sessionId} onChange={e=>setSessionId(e.target.value)} />
          <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
          <button onClick={join}>Join</button>
        </div>
      ) : (
        <div>
          <p>Joined session <b>{sessionId}</b> as <b>{name}</b></p>
          {activePoll ? (
            <div>
              <h4>{activePoll.question}</h4>
              <div>Time left: {timeLeft}s</div>
              <ul>
                {activePoll.options.map((o,i)=>(
                  <li key={i}>
                    <button onClick={()=>submit(i)}>{o.text}</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : results ? (
            <div>
              <h4>Results</h4>
              {results.options.map((o,i)=> <div key={i}>{o.text} — {o.count} votes</div>)}
            </div>
          ) : (
            <div>Waiting for teacher to ask a question...</div>
          )}
        </div>
      )}
    </div>
  );
}
