import { WebSocketGateway,ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateMessageInput } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from 'socket.io';


@WebSocketGateway({
  cors: {
    origin: ['http://0.0.0.0:3001', 'http://localhost:3001', 'http://192.168.254.177:3001'], // Permitir o frontend
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}
  
  private users: { [key: string]: number } = {}; // mapa de socketId para userId
  private rooms: { [key: string]: number[] } = {} // mapa de roomId para userIds

  // disconnected
  handleDisconnect(client: any) {
    console.log(`Disconnected: ${client.id}`);
    const userId = this.users[client.id];
    
    if (userId) {
      for (const roomId in this.rooms){
        this.rooms[roomId] = this.rooms[roomId].filter(id => id !== userId);
        if (this.rooms[roomId].length === 0){
          delete this.rooms[roomId];
        }
      }  
      delete this.users[client.id];
    }
  }


  handleConnection(client: any, ...args: any[]) {
    console.log(`Connecteion:`);
    console.log(client.id)
  }


  
  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, @MessageBody() data: CreateMessageInput) {
    try {
      console.log(data);
      const message = await this.chatService.createMessage(data);
      this.server.to(`room_${data.roomId}`).emit('newMessage', message);
  
      // Emite uma notificação para o destinatário
      this.server.to(`room_${data.roomId}`).emit('notification', { userId: data.userId });

      return message;
    } catch (error) {
      console.log(error)
    }
  }


  @SubscribeMessage('joinRoom')
  async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() { roomId, userId }: { roomId: number, userId: number }) {
    const room = await this.chatService.getRoom(roomId);
    if (room.users.length < 2 || room.users.some(user => user.id === userId)) {
      client.join(`room_${roomId}`);
      this.users[client.id] = userId;
      if (!this.rooms[roomId]) {
        this.rooms[roomId] = [];
      }
      this.rooms[roomId].push(userId);
      client.emit('joinedRoom', room);
    } else {
      client.emit('error', 'Room is full');
    }
  }



}


