var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
})
socket.on('disconnect', () => {
    console.log('disconnected to server');
})
socket.on('newEmail',(data)=> {
    console.log('new email',data);
})

socket.on('newMessage', (newMessage) => {
    console.log("newMessage", newMessage);
    var li = jQuery('<li></li>');
    li.text(`${newMessage.from}:${newMessage.text}`);
    jQuery('#messages').append(li)
})


jQuery('#messege-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('creatMessage',{
        from:'user',
        text: jQuery('[name=message]').val()
    },function(){

    })
})