import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

import { User } from './user.entity';
import { UserArgs } from './dto/users.args';
import { UserModel, UserSchema } from './models/user.model';
import { CreateUserArgs } from './dto/create-user.args';
import { PostModel, PostSchema } from './../post/models/post.model';
import { CommentModel, CommentSchema } from './../comment/models/comment.model';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserSchema) protected readonly repository: UserModel,
		@InjectModel(PostSchema) protected readonly postRepo: PostModel,
		@InjectModel(CommentSchema) protected readonly commentRepo: CommentModel
	) {}
	
	/*
	 * User service used for real business logic or users collection interation
	 */

	// get all user detail
	async findAll(user: UserArgs): Promise<User[]> {
		return await this.repository.find();
	}

	// get user details with userId
	async findOneById(id: string): Promise<User> {
		return await this.repository.findOne({ _id: Types.ObjectId(id) });
	}

	// create user based args
	async createUser(user: CreateUserArgs): Promise<User> {
		return this.repository.create(user);
	}

	// on delete user also delete its posts and comments
	async deleteUser(id: string): Promise<boolean> {
		await this.repository.deleteOne({ _id: Types.ObjectId(id) });
		await this.postRepo.deleteMany({ userId: Types.ObjectId(id) });
		await this.commentRepo.deleteMany({ userId: Types.ObjectId(id) });
		return true;
	}
}
