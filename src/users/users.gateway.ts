import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class UsersGateway {
    @WebSocketServer()
    server: Server

    sendNewUserNotification(email: string, name: string){
        this.server.emit('newUser', {email, name})
    }
}
