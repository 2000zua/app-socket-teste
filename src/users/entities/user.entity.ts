import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  name      :string

  @Field(() => String, { description: 'Example field (placeholder)' })
  email     :string

  @Field(() => String, { description: 'Example field (placeholder)' })
  password  :string

  @Field(() => Date, { description: 'Example field (placeholder)' })
  createdAt: Date;

  @Field(() => Date, { description: 'Example field (placeholder)' })
  updatedAt: Date;
}
