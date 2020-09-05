import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose'

import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { CommentSchema } from './models/comment.model';

@Module({
	imports: [TypegooseModule.forFeature([CommentSchema])],
	providers: [CommentResolver, CommentService],
	exports: [CommentService],
})
export class CommentModule {}
