import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose'
import { PubSub } from 'graphql-subscriptions';

import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { CommentSchema } from './models/comment.model';

import { RedisModule } from './../../config/redis/redis';

@Module({
	imports: [TypegooseModule.forFeature([CommentSchema]), RedisModule.registerRedisPubSub()],
	providers: [CommentResolver, CommentService],
	exports: [CommentService],
})
export class CommentModule {}
