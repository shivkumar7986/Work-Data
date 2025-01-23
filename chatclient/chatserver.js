var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var myusers=[];
var mysocket=[];
app.get('/', function(req, res) {
   res.sendfile('chatclient.html');
});
var i=0;
io.on('connection', function(socket) {
   console.log('A user connected');

    
  socket.on('msg', function(data) {
    var m=0;
     for(k=0;k<i;k++)
        {
           if(myusers[k]==data.user2)
              {
               console.log("match found");
               // console.log(mysocket[k]);
               mysocket[k].send(data.user+":"+data.message+" from :"+data.user2);
               m=1;
               break;
              }
        }
     

        if(m==0)
        io.sockets.emit('newmsg', data);
   })
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
   socket.on('setnickname', function(datas) {
      console.log(datas);
       myusers[i]=datas.username;
       mysocket[i]=socket;
      console.log(myusers[i]);
       i++;
        io.sockets.emit('recnickname',  datas);
      });



});

http.listen(3000, function() {
   console.log('listening on *:3000');
});