import { Resolver, Query } from '@nestjs/graphql';

import { Post } from './post.entity';

@Resolver('Post')
export class PostResolver {
	@Query(returns => [Post])
	async posts() {
		return [
			{
				userId: '1',
				_id: '2',
				title: 'qui est esse',
				body: 'est rerum tempore vitae\nsequi sint nihil ',
			},
		];
	}

	@Query(returns => String)
	hello(): String {
		return 'Hello world';
	}
}
