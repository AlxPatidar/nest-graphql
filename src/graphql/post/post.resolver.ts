import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Post } from './post.entity';
import { PostService } from './post.service';
import { PostsArgs } from './dto/posts.args';
import { CreatePostArgs } from './dto/create-post.args';

@Resolver('Post')
export class PostResolver {
	constructor(private readonly postService: PostService) {}

	@Query(returns => Post)
	async post(@Args('id') id: string): Promise<Post> {
		const posts = await this.postService.findOneById(id);
		return posts;
	}

	@Query(returns => [Post])
	posts(@Args() postArgs: PostsArgs): Promise<Post[]> {
		return this.postService.findAll(postArgs);
	}

	@Mutation(() => Boolean)
	public async createPost(
		@Args('post') createPostArgs: CreatePostArgs
	) {
		console.log({ createPostArgs })
		return true
	}

	@Query(returns => String)
	hello(): String {
		return 'Hello world';
	}
}
