import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(type => String)
  _id: string;

  @Field(type => Date, { name: 'createdAt' })
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => String)
  title: string;

  @Field(type => String, { nullable: true })
  body?: string;
}
