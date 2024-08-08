import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
    cors: {
      origin: ['http://0.0.0.0:3001', 'http://localhost:3001', 'http://192.168.254.177:3001'], // Permitir o frontend
      methods: ['GET', 'POST'],
      credentials: true,
    },
})
export class UsersGateway {
    @WebSocketServer()
    server: Server

    sendNewUserNotification(email: string, name: string){
        this.server.emit('newUser', {email, name})
    }
}
