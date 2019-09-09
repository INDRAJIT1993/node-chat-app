
var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
})
socket.on('disconnect', () => {
    console.log('disconnected to server');
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