import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const rooms = new Map();
function makeEmptyState(){ return { board:[[0]], current:1, winner:0, players:{}, history:[], scores:{1:0,2:0} }; }
function getRoom(id){ if(!rooms.has(id)) rooms.set(id, makeEmptyState()); return rooms.get(id); }

io.on('connection',(socket)=>{
  socket.on('room:join',({roomId})=>{
    socket.join(roomId);
    io.to(roomId).emit('room:state', getRoom(roomId));
  });
});

const PORT=process.env.PORT||3001;
server.listen(PORT,()=>console.log('Server listening on',PORT));