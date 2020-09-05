import { InputType, Field, Int } from '@nestjs/graphql';
import {
	IsEmail,
	IsNotEmpty,
	MinLength,
	MaxLength,
	IsMongoId,
} from 'class-validator';

@InputType()
export class LatLongArgs {
	@Field()
	lat: number;

	@Field()
	long: number;
}

@InputType()
export class AddressArgs {
	@Field({ nullable: true })
	suite?: string;
	@Field({ nullable: true })
	street?: string;
	@Field({ nullable: true })
	city?: string;
	@Field({ nullable: true })
	zipcode?: string;
	@Field({ nullable: true })
	geo?: LatLongArgs;
}


@InputType()
export class CreateUserArgs {
	@Field()
	@IsNotEmpty({ message: 'Name is required' })
	name: string;

	@Field()
	@IsNotEmpty({ message: 'Email is required' })
	@IsEmail()
	email: string;

	@Field({ nullable: true })
	website?: string;

	@Field({ nullable: true })
	phone?: string;

	@Field({ nullable: true })
	address?: AddressArgs;
}
