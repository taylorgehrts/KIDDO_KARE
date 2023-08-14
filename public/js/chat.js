var socket = io();

const chatFormSubmitHandler = event => {
    event.preventDefault();

    const message = document.getElementById('chat-box').value;
    const chatWindow = document.getElementById('chat-window');

};

document.getElementById('chat-form').addEventListener('submit', chatFormSubmitHandler);