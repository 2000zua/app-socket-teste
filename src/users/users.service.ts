import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersGateway } from './users.gateway';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersGatewy: UsersGateway
  ){}

  async create(data: CreateUserInput) {
    const user = await this.prisma.user.create({data: {
      name: data.name,
      email: data.email,
      password: data.password
    }});

    this.usersGatewy.sendNewUserNotification(user.email, user.name);
    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({include:{messages: {}, rooms: {}}});
  }

  async findOne(id: number) {
   return this.prisma.user.findUnique({where:{id}, include: {messages: {}, rooms: {}}});
  }

  async update(data: UpdateUserInput) {
    return this.prisma.user.update({where:{id: data.id}, data:{
      name: (data.name !== undefined)? data.name : undefined,
      email: (data.email !== undefined)? data.email : undefined,
      password: (data.password !== undefined)? data.password : undefined,
    }});
  }

  async remove(id: number) {
    return this.prisma.user.delete({where:{id}});
  }
}
