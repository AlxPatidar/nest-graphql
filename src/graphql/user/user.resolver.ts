import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserArgs } from './dto/users.args';
import { CreateUserArgs } from './dto/create-user.args';

@Resolver('User')
export class UserResolver {
	constructor(private readonly userService: UserService) {}
	
	/*
	 * User Resolver
	 * Used for user query and mutation
	 */

	// get user by userId
	@Query(returns => User)
	async user(@Args('id') id: string): Promise<User> {
		return await this.userService.findOneById(id);
	}

	// get users list
	@Query(returns => [User])
	users(@Args() usersArgs: UserArgs): Promise<User[]> {
		return this.userService.findAll(usersArgs);
	}

	// create new user with args
	@Mutation(() => User)
	public async createUser(@Args('user') createUserArgs: CreateUserArgs) {
		return await this.userService.createUser(createUserArgs);
	}

	// delete user
	@Mutation(() => Boolean)
	public async deleteUser(@Args('id') id: string): Promise<Boolean> {
		await this.userService.deleteUser(id);
		return true;
	}
}
