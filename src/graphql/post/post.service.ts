import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

import { Post, PostDetail } from './post.entity';
import { PostsArgs } from './dto/posts.args';
import { PostModel, PostSchema } from './models/post.model';
import { CreatePostArgs } from './dto/create-post.args';
import { CommentModel, CommentSchema } from './../comment/models/comment.model';

@Injectable()
export class PostService {
	constructor(
		@InjectModel(PostSchema) protected readonly repository: PostModel,
		@InjectModel(CommentSchema) protected readonly commentRepo: CommentModel
	) {}

	async create(post: CreatePostArgs): Promise<Post> {
		return this.repository.create(post);
	}

	async findOneById(postId: string): Promise<PostDetail> {
		return this.repository.aggregate([
			{ $match: { _id: Types.ObjectId(postId) } },
			{
				$lookup: {
					from: 'users',
					let: { userId: '$userId' },
					pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$userId'] } } }],
					as: 'user',
				},
			},
			{
				$project: {
					title: '$title',
					createdAt: '$createdAt',
					updatedAt: '$updatedAt',
					body: '$body',
					id: { $toString: '$_id' },
					_id: '$_id',
					user: { $arrayElemAt: ['$user', 0] },
				},
			},
			{
				$lookup: {
					from: 'comments',
					let: { postId: '$id' },
					pipeline: [
						{
							$match: {
								$expr: { $eq: [{ $toString: '$postId' }, '$$postId'] },
							},
						},
						{
							$lookup: {
								from: 'users',
								let: { userId: '$userId' },
								pipeline: [
									{ $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
								],
								as: 'user',
							},
						},
						{
							$project: {
								id: { $toString: '$_id' },
								createdAt: '$createdAt',
								updatedAt: '$updatedAt',
								user: { $arrayElemAt: ['$user', 0] },
								_id: 0,
								comment: '$body',
							},
						},
					],
					as: 'comments',
				},
			},
		]);
	}

	async findAll(recipesArgs: PostsArgs): Promise<PostDetail[]> {
		return this.repository.aggregate([
			{
				$lookup: {
					from: 'users',
					let: { userId: '$userId' },
					pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$userId'] } } }],
					as: 'user',
				},
			},
			{
				$project: {
					title: '$title',
					createdAt: '$createdAt',
					updatedAt: '$updatedAt',
					body: '$body',
					id: { $toString: '$_id' },
					_id: '$_id',
					user: { $arrayElemAt: ['$user', 0] },
				},
			},
			{
				$lookup: {
					from: 'comments',
					let: { postId: '$id' },
					pipeline: [
						{
							$match: {
								$expr: { $eq: [{ $toString: '$postId' }, '$$postId'] },
							},
						},
						{
							$lookup: {
								from: 'users',
								let: { userId: '$userId' },
								pipeline: [
									{ $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
								],
								as: 'user',
							},
						},
						{
							$project: {
								id: { $toString: '$_id' },
								createdAt: '$createdAt',
								user: { $arrayElemAt: ['$user', 0] },
								_id: '$_id',
								comment: '$comment',
								postId: '$postId',
								userId: '$userId',
							},
						},
					],
					as: 'comments',
				},
			},
		]);
	}
	async deletePost(id: string): Promise<boolean> {
		await this.repository.deleteMany({ _id: Types.ObjectId(id) });
		await this.commentRepo.deleteMany({ postId: Types.ObjectId(id) });
		return true;
	}
}
