import { Field, InputType, Int } from "@nestjs/graphql";


@InputType()
export class CreateMessageInput {
  @Field()
  content: string;

  @Field(() => Int)
  roomId: number;

  @Field(() => Int)
  userId: number;
}