import { Injectable } from '@nestjs/common';

import { Comment } from './comment.entity'
import { CommentsArgs } from './dto/commnet.args'

@Injectable()
export class CommentService {
	async findOneById(id: string): Promise<Comment> {
		return {} as any;
	}

	async findAll(recipesArgs: CommentsArgs): Promise<Comment[]> {
		return [] as Comment[];
	}

}
