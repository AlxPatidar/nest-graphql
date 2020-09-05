import { Injectable } from '@nestjs/common';

import { User } from './user.entity'
import { UserArgs } from './dto/users.args'

@Injectable()
export class UserService {
	async findOneById(id: string): Promise<User> {
		return {} as any;
	}

	async findAll(recipesArgs: UserArgs): Promise<User[]> {
		return [] as User[];
	}
}
