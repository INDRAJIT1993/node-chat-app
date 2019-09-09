const path = require('path');
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const { generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = SocketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected to application');
  
    socket.emit('newMessage', generateMessage('Admin','welcome to chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'))
    socket.on('creatMessage',(newMessage,callback)=>{
      console.log("newMessage",newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text))
        // callback('this is from server');
    })
    socket.on('createLocation',(coordinates)=>{
        io.emit('newLocationMessage', generateLocationMessage('admin', coordinates.latitude,coordinates.longitude))
    })

    socket.on('disconnect', () => {
        console.log('user disconnected from application')
    })
})
server.listen(port, () => {
    console.log(`server is up on port ${port}`)
})

