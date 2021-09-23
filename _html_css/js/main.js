const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();

socket.on('message', message => {
    console.log(message);
    outputFormattedMessage(message);

    //chat page is always on the bottom with the newest messages
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// sending message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit('messageSubmit', msg);

    //clear input blank and focus on message
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

function outputFormattedMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span> </p> <p class="text">${message.text}</p>`
    document.querySelector('.chat-messages').appendChild(div);
};