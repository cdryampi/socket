// conenction
let socket = io();

// DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function() {
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    });
});

message.addEventListener('keypress', function() {
    socket.emit('chat:typing', username.value)
})


socket.on('chat:message', function(data) {
    actions.innerHTML = '';

    output.innerHTML += `<p><strong style="color:red">` + sanitizeHTML(data.username) + `</strong>:
                        ` + sanitizeHTML(data.message) + `</p>`
})
socket.on('chat:typing', function(data) {
    msg = `${data}`
    actions.innerHTML = `<p><em>` + sanitizeHTML(msg) + `: is typing a message.</em></p>`
})

// quitar las inyecciones de la web

var sanitizeHTML = function(str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};