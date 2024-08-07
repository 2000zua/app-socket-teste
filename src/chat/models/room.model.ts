import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { Message } from "./message.model";


@ObjectType()
export class Room {
  @Field(() => Int)
  id: number;

  @Field()
  createdAt: Date;

  @Field(() => [User])
  users: User[];

  @Field(() => [Message])
  messages: Message[];
}