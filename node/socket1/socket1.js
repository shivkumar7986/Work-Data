const app = require('express')();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'chat.html'));
});

 io.on('connection', function(socket){
    console.log(' A user connected');


    socket.on('message', (msg)=>{
        console.log(msg);
        io.sockets.emit('newMessage', msg);
    })

    socket.on('disconnect', function(){
        console.log('A user disconnected');
    })
 })

http.listen(3000, () => {
    console.log('server listening on port 3000');
});
