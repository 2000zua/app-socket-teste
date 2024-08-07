import { WebSocketGateway,ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateMessageInput } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from 'socket.io';


@WebSocketGateway()
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
    console.log(`Connecteion: ${client}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: CreateMessageInput) {
    const message = await this.chatService.createMessage(data);
    this.server.to(`room_${data.roomId}`).emit('newMessage', message);
    return message;
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


