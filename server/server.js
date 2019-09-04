const path=require('path');
const http=require('http');
const express=require('express');
const SocketIO=require('socket.io');
const publicPath = path.join(__dirname,'../public');
const port=process.env.PORT || 3000;
var app=express();
var server= http.createServer(app);
var io=SocketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
console.log('new user connected to application',socket.id,socket.connected);
socket.on('disconnect',()=>{
    console.log('user disconnected from application')
})
})
server.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})

