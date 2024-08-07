import { ObjectType, Field, Int } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class Message {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    contyent: string

    @Field(() => Date)
    createAt: Date

    @Field(() => User)
    user: User
}