 
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength, IsMongoId } from 'class-validator';

@InputType()
export class CreatePostArgs {
  @Field()
  @IsMongoId()
  userId: string

  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  body?: string;
}