 
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength, IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePostArgs {
  @Field()
  @IsMongoId()
  @IsNotEmpty({ message: 'userId is required' })
  userId: string

  @Field()
  @MaxLength(30)
  @IsNotEmpty({ message: 'title is required' })
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  body?: string;
}