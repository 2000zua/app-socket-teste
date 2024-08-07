import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersGateway } from './users.gateway';

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService, UsersGateway],
})
export class UsersModule {}


