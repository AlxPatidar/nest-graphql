import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Post, PostDetail } from './post.entity';
import { PostService } from './post.service';
import { PostsArgs } from './dto/posts.args';
import { CreatePostArgs } from './dto/create-post.args';

@Resolver('Post')
export class PostResolver {
	constructor(private readonly postService: PostService) {}

	@Query(returns => PostDetail)
	async post(@Args('id') id: string): Promise<Post> {
		const posts = await this.postService.findOneById(id);
		return posts[0];
	}

	@Query(returns => [PostDetail])
	async posts(@Args() postArgs: PostsArgs): Promise<Post[]> {
		return await this.postService.findAll(postArgs);
	}

	@Mutation(() => Post)
	public async createPost(
		@Args('post') createPostArgs: CreatePostArgs
	): Promise<Post> {
		return await this.postService.create(createPostArgs);
	}
	@Mutation(() => Boolean)
	public async deletePost(@Args('id') id: string): Promise<Boolean> {
		await this.postService.deletePost(id);
		return true;
	}

	@Query(returns => String)
	hello(): String {
		return 'Hello world';
	}
}
