import { ObjectType, Field, Int } from '@nestjs/graphql';

import { User } from '../user/user.entity'
import { Post } from '../post/post.entity'

@ObjectType()
export class Comment {
  @Field(type => String)
  _id: string;

  @Field(type => String)
  postId: string;

  @Field(type => String)
  userId: string;

  @Field(type => String, { nullable: true })
  comment?: string;

  @Field(type => Date, { name: 'createdAt' })
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;
}

@ObjectType()
export class CommentDetail extends Comment {
  @Field(type => Post, { name: 'post' })
  post: Post;

  @Field(type => User, { name: 'user' })
  user: User
}
