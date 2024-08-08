import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { nullable: true, })
  id: number;

  @Field(() => String, { nullable: true,  })
  name: string

  @Field(() => String, { nullable: true,  })
  email: string

  @Field(() => String, { nullable: true,  })
  password: string

  @Field(() => Date, { nullable: true, name: 'createdAt' })
  createAt: Date;

  @Field(() => Date, { nullable: true,  })
  updatedAt: Date;
}
