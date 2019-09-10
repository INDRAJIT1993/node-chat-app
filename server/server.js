const path = require('path');
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const { generateMessage, generateLocationMessage} = require('./utils/message');
const { isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = SocketIO(server);
var users = new Users();
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected to application');
  
    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name)||!isRealString(params.room)){
           return callback('name and room are required')
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        // socket.leave('the office group')
        // io.emit -> io.to('the office group').emit
        // socket.broadcast.emit -> socket.broadcast.to('the office group').emit
        // socket.emit
        socket.emit('newMessage', generateMessage('Admin', 'welcome to chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))
    })
    socket.on('creatMessage',(newMessage,callback)=>{
        var user = users.getUser(socket.id)
        if (user && isRealString(newMessage.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text))
        }
    //   console.log("newMessage",newMessage);
        // callback('this is from server');
    })
    socket.on('createLocation',(coordinates)=>{
        var user = users.getUser(socket.id)
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coordinates.latitude, coordinates.longitude))
        }
    })

    socket.on('disconnect', () => {
        var user =users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage',generateMessage('admin',`${user.name} has left the room`))
        }
        console.log('user disconnected from application')
    })
})
server.listen(port, () => {
    console.log(`server is up on port ${port}`)
})

