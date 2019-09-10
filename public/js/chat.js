
var socket = io();
function scrollToBottom() {
    // slectors
    var messages = jQuery('#messages')
    var newMessage = messages.children('li:last-child')
    // height
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight)
    }

}

socket.on('connect', () => {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err)
            window.location.href = '/'
        } else {
            console.log('no error')

        }
    })
    console.log('connected to server');
})
socket.on('disconnect', () => {
    console.log('disconnected to server');
})
socket.on('updateUserList',function(users){
    var ol= jQuery('<ol></ol>')
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user))
    })
    jQuery('#users').html(ol);
})
socket.on('newEmail', (data) => {
    console.log('new email', data);
})

socket.on('newMessage', (newMessage) => {
    var formattedTime = moment(newMessage.createdat).format('h:mm a')
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: newMessage.text,
        from: newMessage.from,
        createdat: formattedTime
    })
    jQuery('#messages').append(html)
    scrollToBottom();
    // console.log("newMessage", newMessage);
    // var li = jQuery('<li></li>');
    // li.text(`${newMessage.from} ${formattedTime}:${newMessage.text}`);
    // jQuery('#messages').append(li)
})

socket.on('newLocationMessage', (message) => {
    var formattedTime = moment(message.createdat).format('h:mm a')
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdat: formattedTime
    })
    jQuery('#messages').append(html)
    scrollToBottom();
    // var li = jQuery('<li></li>')
    // var a = jQuery('<a target="_blank">My current location</a>')
    // li.text(`${message.from} ${formattedTime}:`)
    // a.attr('href', message.url)
    // li.append(a);
    // jQuery('#messages').append(li)

})


jQuery('#messege-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('creatMessage', {
        from: 'user',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    })
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }
    locationButton.attr('disabled', 'disabled').text('sending location...')
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('send location')
        console.log(position.coords.latitude);
        socket.emit('createLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled').text('send location')
        return alert('something went wrong')
    })
})