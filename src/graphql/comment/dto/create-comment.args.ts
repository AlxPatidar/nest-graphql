 
import { Field, InputType } from '@nestjs/graphql';
import { Length, IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCommentArgs {
  @Field()
  @IsMongoId()
  @IsNotEmpty({ message: 'userId is required' })
  // commented by user id
  userId: string

  @Field()
  @IsMongoId()
  @IsNotEmpty({ message: 'postId is required' })
  // comment on postId it is mongo Object
  postId: string

  @Field()
  @Length(1, 255)
  @IsNotEmpty({ message: 'comment is required' })
  // comment on post
  comment: string;
}