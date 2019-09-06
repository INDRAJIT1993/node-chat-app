var socket = io();

socket.on('connect', () => {
    console.log('connected to server');

    socket.emit('creatMessage',{
        from:"sam",
        text:"yep it work for me"
    })
})
socket.on('disconnect', () => {
    console.log('disconnected to server');
})
socket.on('newEmail',(data)=> {
    console.log('new email',data);
})

socket.on('newMessage', (newMessage) => {
    console.log("newMessage", newMessage);
})