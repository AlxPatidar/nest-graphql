import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PostSchema } from './models/post.model';
import { CommentSchema } from './../comment/models/comment.model';

@Module({
	imports: [TypegooseModule.forFeature([PostSchema, CommentSchema])],
	providers: [PostResolver, PostService],
	exports: [PostService],
})
export class PostModule {}
