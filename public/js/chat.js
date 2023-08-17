const socket = io();

const chatJobId = document.getElementById('job-id').dataset.id;

socket.emit('join', `${chatJobId}`);

const chatFormSubmitHandler = event => {
    event.preventDefault();

    
    const userName = document.getElementById('user-name').dataset.name;
    const messageBox = document.getElementById('chat-box');
    const message = messageBox.value;
    

    // Emit socket.io event
    if (message) {
        socket.emit(`message`, {
            message,
            userName,
            jobId: chatJobId
        });
        messageBox.value = '';
    }
};

document.getElementById('chat-form').addEventListener('submit', chatFormSubmitHandler);

// Recieve chat messages
const chatWindow = document.getElementById('chat-window');

// Poulate chatWindow with message history

fetch(`/api/messages/${chatJobId}`).then(response => {
    response.json().then(data => {
        for (msg of data) {
            const msgDiv = document.createElement('div');
            msgDiv.textContent = `${msg.senderName}: ${msg.body}`;
            chatWindow.appendChild(msgDiv);

            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    })
});

socket.on('message', data => {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = `${data.userName}: ${data.msg}`;
    chatWindow.appendChild(msgDiv);

    chatWindow.scrollTop = chatWindow.scrollHeight;
});