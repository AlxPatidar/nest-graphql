import { Module } from '@nestjs/common';

import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';

@Module({
	imports: [PostModule, UserModule, CommentModule],
})
export class GraphqlModule {}
