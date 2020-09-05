 
import { Field, InputType } from '@nestjs/graphql';
import { Length, IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCommentArgs {
  @Field()
  @IsMongoId()
  @IsNotEmpty({ message: 'userId is required' })
  userId: string

  @Field()
  @IsMongoId()
  @IsNotEmpty({ message: 'postId is required' })
  postId: string

  @Field()
  @Length(1, 255)
  @IsNotEmpty({ message: 'comment is required' })
  comment: string;
}