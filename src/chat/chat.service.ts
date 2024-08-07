import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Room } from '@prisma/client';

@Injectable()
export class ChatService {
  
  constructor(
    private readonly prisma: PrismaService
  ){}

  async createRoom(userIds: number[]): Promise<Room>{
    return this.prisma.room.create({
      data: {
        users: {
          connect: userIds.map(id => ({ id })),
        }
      },
      include: {
        messages: true,
        users: true
      }
    });
  }

  async getRoom(roomId: number): Promise<any> {
    return this.prisma.room.findUnique({
      where:{id: roomId}, 
      include: {
        messages: {
          include: {}
        },
        users: {
          include: {}
        }
      }
  });
  }

  async createMessage(data: CreateMessageInput){
    return this.prisma.message.create({
      data,
      include: {
        user: true
      }
    })
  }

}
