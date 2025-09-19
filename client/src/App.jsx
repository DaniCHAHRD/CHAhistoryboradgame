import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';

export default function App(){
  const [socket,setSocket]=useState(null);
  const [state,setState]=useState(null);
  const [roomId,setRoomId]=useState('demo');

  useEffect(()=>{ 
    const s=io(SERVER_URL); setSocket(s);
    s.emit('room:join',{roomId});
    s.on('room:state',(st)=>setState(st));
    return ()=>s.disconnect();
  },[roomId]);

  return <div>
    <h1>Realtime Boardgame</h1>
    <input value={roomId} onChange={e=>setRoomId(e.target.value)}/>
    <pre>{JSON.stringify(state,null,2)}</pre>
  </div>;
}