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
	@IsNotEmpty({ message: 'Lat is required' })
	lat: number;

	@Field()
	@IsNotEmpty({ message: 'Long is required' })
	long: number;
}

@InputType()
export class AddressArgs {
	@IsNotEmpty({ message: 'Street is required' })
	@Field()
	street: string;

	@IsNotEmpty({ message: 'City is required' })
	@Field()
	city: string;

	@IsNotEmpty({ message: 'zipcode is required' })
	@Field()
	zipcode: string;

	@IsNotEmpty({ message: 'Geo-Location is required' })
	@Field()
	geo: LatLongArgs;
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

	@Field()
	@IsNotEmpty({ message: 'Website is required' })
	website: string;

	@Field()
	@IsNotEmpty({ message: 'Phone is required' })
	phone: string;

	@Field()
	address: AddressArgs;
}
