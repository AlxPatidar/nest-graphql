import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Comment, CommentDetail } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentsArgs } from './dto/comment.args';
import { CreateCommentArgs } from './dto/create-comment.args';

@Resolver('Comment')
export class CommentResolver {
	constructor(private readonly commentService: CommentService) {}

	@Query(returns => CommentDetail)
	async comment(@Args('id') id: string): Promise<Comment> {
		const comments = await this.commentService.findOneById(id);
		return comments;
	}

	@Query(returns => [CommentDetail])
	comments(@Args() commentArgs: CommentsArgs): Promise<Comment[]> {
		return this.commentService.findAll(commentArgs);
	}

	@Mutation(() => Comment)
	public async createComment(
		@Args('comment') createCommentArgs: CreateCommentArgs
	): Promise<Comment> {
		return await this.commentService.create(createCommentArgs);
	}
		@Mutation(() => Boolean)
	public async deleteComment(@Args('id') id: string): Promise<Boolean> {
		await this.commentService.deleteComment(id);
		return true;
	}

}
