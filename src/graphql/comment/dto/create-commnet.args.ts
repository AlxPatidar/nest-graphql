 
import { Field, InputType } from '@nestjs/graphql';
import { Length, IsMongoId } from 'class-validator';

@InputType()
export class CreateCommentArgs {
  @Field()
  @IsMongoId()
  userId: string

  @Field()
  @IsMongoId()
  postId: string

  @Field()
  @Length(1, 255)
  comment: string;
}