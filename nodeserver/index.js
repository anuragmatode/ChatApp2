const io=require('socket.io')(8000)
const users={}
io.on('connection',socket =>{
    socket.on('new-user-joined',uName =>{
        console.log(uName);
        users[socket.id]=uName;
      socket.broadcast.emit('user-joined',uName);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,uName:users[socket.id]});
    });
});