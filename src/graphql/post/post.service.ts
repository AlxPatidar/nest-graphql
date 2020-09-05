import { Injectable } from '@nestjs/common';

import { Post } from './post.entity';
import { PostsArgs } from './dto/posts.args';

@Injectable()
export class PostService {
	async findOneById(id: string): Promise<Post> {
		return {} as any;
	}

	async findAll(recipesArgs: PostsArgs): Promise<Post[]> {
		return [] as Post[];
	}
}
