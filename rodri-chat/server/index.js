import express from 'express';
import logger from 'morgan';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user has connected');

    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });

    // Manejar el evento 'chat message' desde el cliente
    socket.on('chat message', (message) => {
        console.log('Message from client:', message);

        // Emitir el mensaje a todos los clientes conectados
        io.emit('chat message', message);
    });
});

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './client' });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
