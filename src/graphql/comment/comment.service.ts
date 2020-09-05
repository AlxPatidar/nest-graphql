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
		@InjectModel(CommentSchema) protected readonly repository: CommentModel
	) {}
	async findOneById(id: string): Promise<Comment> {
		return this.repository.findOne(id);
	}
	async findAll(commentArgs): Promise<Comment[]> {
		return this.repository.find();
	}
	async create(comment: CreateCommentArgs): Promise<Comment> {
		return this.repository.create(comment);
	}
	async deleteComment(id: string): Promise<boolean> {
		await this.repository.deleteMany({ _id: Types.ObjectId(id) });
		return true;
	}
}
