var socket = io();

const chatFormSubmitHandler = event => {
    event.preventDefault();

    const messageBox = document.getElementById('chat-box');
    const message = messageBox.value;
    const chatWindow = document.getElementById('chat-window');

    // Emit socket.io event
    if (message) {
        socket.emit('message', message);
        messageBox.value = '';
    }

    // Recieve chat messages
    socket.on('message', msg => {
        var msgDiv = document.createElement('div');
        msgDiv.textContent = msg;
        chatWindow.append(msgDiv);

        msgDiv.scrollTo({ top: msgDiv.scrollHeight });
    });
};

document.getElementById('chat-form').addEventListener('submit', chatFormSubmitHandler);