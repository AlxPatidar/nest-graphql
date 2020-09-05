import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserSchema } from './models/user.model';
import { PostSchema } from './../post/models/post.model';
import { CommentSchema } from './../comment/models/comment.model';

@Module({
	imports: [
		TypegooseModule.forFeature([UserSchema, PostSchema, CommentSchema]),
	],
	providers: [UserResolver, UserService],
	exports: [UserService],
})
export class UserModule {}
