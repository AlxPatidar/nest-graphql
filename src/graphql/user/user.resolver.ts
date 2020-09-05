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
		const recipe = await this.userService.findOneById(id);
		return recipe;
	}

	@Query(returns => [User])
	users(@Args() usersArgs: UserArgs): Promise<User[]> {
		return this.userService.findAll(usersArgs);
	}
	@Mutation(() => Boolean)
	public async createUser(
		@Args('user') createUserArgs: CreateUserArgs
	) {
		console.log({createUserArgs })
		return true
	}
}
