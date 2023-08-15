const socket = io();

const chatFormSubmitHandler = event => {
    event.preventDefault();

    const messageBox = document.getElementById('chat-box');
    const message = messageBox.value;
    const pageUserId = document.getElementById('page-user').dataset.id;
    const loggedInUserId = document.getElementById('logged-in-user').dataset.id;

    // Emit socket.io event
    if (message) {
        socket.emit(`message`, {
            message,
            users: [pageUserId, loggedInUserId]
        });
        messageBox.value = '';
    }


};

document.getElementById('chat-form').addEventListener('submit', chatFormSubmitHandler);

// Recieve chat messages
const chatWindow = document.getElementById('chat-window');

socket.on('message', (userName, msg) => {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = `${userName}: ${msg}`;
    chatWindow.append(msgDiv);

    msgDiv.scrollTo({ top: msgDiv.scrollHeight });
});