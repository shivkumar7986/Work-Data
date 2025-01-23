// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server);         // Attach Socket.IO to the server

// Serve a static HTML file (optional)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

app.get('/cars', (req,res)=>{
  res.sendFile(__dirname + '/chat.html')
})

app.get('/movies', (req,res)=>{
  res.sendFile(__dirname + '/chat.html')
})

// Socket.IO connection event
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for custom events from the client
  socket.on('chat message', (msg) => {
    console.log('Message: ' + msg);

    // Emit the message to all clients (including the sender)
    io.emit('chat message', msg);
  });

  // Handle the disconnection event
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server
server.listen(8000, () => {
  console.log('Listening on *:3000');
});
