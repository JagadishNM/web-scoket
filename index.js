const express = require('express');
const path = require('path');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5111;

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/index.html'));
});

io.on('connection', (socket) => {
	console.log('connection established');

	socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

server.listen(PORT, () => {
	console.log(`Server running at port ${PORT}`);
});
