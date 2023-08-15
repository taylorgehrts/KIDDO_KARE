const socket = io();

const chatFormSubmitHandler = event => {
    event.preventDefault();

    const messageBox = document.getElementById('chat-box');
    const message = messageBox.value;
    const chatWindow = document.getElementById('chat-window');
    const pageUserId = document.getElementById('page-user').dataset.id;
    const loggedInUserId = document.getElementById('logged-in-user').dataset.id;

    // Emit socket.io event
    if (message) {
        socket.emit(`message`, {
            message,
            pageUserId,
            loggedInUserId
        });
        messageBox.value = '';
    }


};

document.getElementById('chat-form').addEventListener('submit', chatFormSubmitHandler);

// Recieve chat messages
socket.on('message', (userName, msg) => {
    var msgDiv = document.createElement('div');
    msgDiv.textContent = `${userName}: ${msg}`;
    chatWindow.append(msgDiv);

    msgDiv.scrollTo({ top: msgDiv.scrollHeight });
});