import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentsArgs } from './dto/commnet.args';
import { CreateCommentArgs } from './dto/create-commnet.args';

@Resolver('Comment')
export class CommentResolver {
	constructor(private readonly commentService: CommentService) {}

	@Query(returns => Comment)
	async comment(@Args('id') id: string): Promise<Comment> {
		const comments = await this.commentService.findOneById(id);
		return comments;
	}

	@Query(returns => [Comment])
	comments(@Args() commentArg: CommentsArgs): Promise<Comment[]> {
		return this.commentService.findAll(commentArg);
	}

	@Mutation(() => Boolean)
	public async createComment(
		@Args('comment') createCommentArgs: CreateCommentArgs
	) {
		console.log({ createCommentArgs })
		return true
	}

}
