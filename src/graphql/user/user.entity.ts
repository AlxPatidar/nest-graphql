import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

import { Comment } from '../comment/comment.entity';
import { Post } from '../post/post.entity';

@ObjectType()
export class LatLong {
  @Field(type => Float)
  lat: number;
  @Field(type => Float)
  long: number;
}

@ObjectType()
export class Address {
  @Field(type => String)
  street: string;

  @Field(type => Date, { name: 'createdAt' })
  suite: Date;

  @Field(type => String)
  city: string;

  @Field(type => String)
  zipcode?: string;

  @Field(type => LatLong)
  geo?: LatLong;
}

@ObjectType()
export class User {
  @Field(type => String)
  _id: string;

  @Field(type => Date, { name: 'createdAt' })
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => String)
  name: string;

  @Field(type => String)
  email: string;

  @Field(type => String)
  website: string;

  @Field(type => String)
  phone: string;

  @Field(type => Address)
  address: Address;
}
