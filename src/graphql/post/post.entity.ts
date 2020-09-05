import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';

@ObjectType()
export class Post {
  @Field(type => String)
  _id: string;

  @Field(type => Date, { name: 'createdAt' })
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;
  
  @Length(30, 255)
  @Field(type => String)
  title: string;
  
  @IsOptional()  
  @Field(type => String, { nullable: true })
  body?: string;
}

@ObjectType()
export class PostDetail extends Post {
  @Field(type => [Comment], { name: 'comments' })
  comments: [Comment];

  @Field(type => User, { name: 'user' })
  user: User
}
