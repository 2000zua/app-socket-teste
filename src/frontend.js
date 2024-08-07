import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');
  const roomId = 1; // substitua pelo ID da sala real
  const userId = 1; // substitua pelo ID do usuário real
  socket.emit('joinRoom', { roomId, userId });
});

socket.on('joinedRoom', (room) => {
  console.log('Joined room:', room);
});

socket.on('newMessage', (message) => {
  console.log('New message:', message);
});

socket.on('error', (error) => {
  console.error('Error:', error);
});

const sendMessage = (content, roomId, userId) => {
  socket.emit('sendMessage', { content, roomId, userId });
};

// Exemplo de envio de mensagem
sendMessage('Olá, mundo!', 1, 1); // substitua os IDs pelos valores reais
