const socket= io('http://localhost:8000',{ transports:['websocket','polling']});
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messagecontainer = document.querySelector(".container");
const append = (message,position)=>{
    const messageelement = document.createElement('div');
    messageelement.innerText=message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
}

form.addEventListener('submit',(e)=>{
e.preventDefault();
const msg=messageInput.value;
if(msg!==""){
append(`You : ${msg}`,'right');
socket.emit('send',msg);
}
messageInput.value="";
})
const uName = prompt("Enter your name to join");

socket.emit('new-user-joined',uName)

socket.on('user-joined',uName=>{
    append(`${uName} joined the chat`,'right');
})

socket.on('receive',data=>{
    append(`${data.uName} : ${data.message}`,'left');
})