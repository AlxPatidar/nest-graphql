import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserArgs } from './dto/users.args';
import { CreateUserArgs } from './dto/create-user.args';

@Resolver('User')
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(returns => User)
	async user(@Args('id') id: string): Promise<User> {
		return await this.userService.findOneById(id);
	}

	@Query(returns => [User])
	users(@Args() usersArgs: UserArgs): Promise<User[]> {
		return this.userService.findAll(usersArgs);
	}

	@Mutation(() => User)
	public async createUser(@Args('user') createUserArgs: CreateUserArgs) {
		return await this.userService.createUser(createUserArgs);
	}

	@Mutation(() => Boolean)
	public async deleteUser(@Args('id') id: string): Promise<Boolean> {
		await this.userService.deleteUser(id);
		return true;
	}
}
