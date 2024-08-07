import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Room } from "./models/room.model";
import { ChatService } from "./chat.service";
import { Message } from "./models/message.model";
import { CreateMessageInput } from "./dto/create-chat.dto";


@Resolver(() => Room)
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Query(() => Room)
  async room(@Args('roomId') roomId: number) {
    return this.chatService.getRoom(roomId);
  }

  @Mutation(() => Room)
  async createRoom(@Args({ name: 'userIds', type: () => [Number] }) userIds: number[]) {
    return this.chatService.createRoom(userIds);
  }

  @Mutation(() => Message)
  async createMessage(@Args('data') data: CreateMessageInput) {
    return this.chatService.createMessage(data);
  }
}