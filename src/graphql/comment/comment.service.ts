import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

import { Comment } from './comment.entity';
import { CommentsArgs } from './dto/comment.args';
import { CreateCommentArgs } from './dto/create-comment.args';
import { CommentModel, CommentSchema } from './models/comment.model';

@Injectable()
export class CommentService {
	constructor(
		// Inject model for use model using typegoose
		@InjectModel(CommentSchema) protected readonly repository: CommentModel
	) {}
	/*
	* Comment service used for real business logic or comments collection interation
	*/

	// find one comment based commentId
	async findOneById(id: string): Promise<Comment> {
		return this.repository.findOne({ _id: Types.ObjectId(id) });
	}

	// get all comments
	async findAll(commentArgs): Promise<Comment[]> {
		return this.repository.find();
	}

	// create new comments on postId with userId
	async create(comment: CreateCommentArgs): Promise<Comment> {
		return this.repository.create(comment);
	}

	// delete commnet based on commentId
	async deleteComment(id: string): Promise<boolean> {
		await this.repository.deleteMany({ _id: Types.ObjectId(id) });
		return true;
	}
}
