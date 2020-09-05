import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose'
import { PubSub } from 'graphql-subscriptions';

import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { CommentSchema } from './models/comment.model';

@Module({
	imports: [TypegooseModule.forFeature([CommentSchema])],
	providers: [CommentResolver, CommentService, {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    }],
	exports: [CommentService],
})
export class CommentModule {}
