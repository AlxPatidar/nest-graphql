import {
	Module,
	OnModuleDestroy,
	Inject,
	Optional,
	DynamicModule,
} from '@nestjs/common';
import { RedisService } from './redis.service';
import * as Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Module({
	providers: [RedisService],
	exports: [RedisService],
})
export class RedisModule implements OnModuleDestroy {
	constructor(
		@Optional()
		@Inject('REDIS_CLIENT')
		private readonly redisClient: Redis.Redis,

		@Optional()
		@Inject('REDIS_PUB_SUB')
		private readonly redisPubSub: RedisPubSub
	) {}
	async onModuleDestroy() {
		if (this.redisClient) {
			this.redisClient.disconnect();
		}
		if (this.redisPubSub) {
			this.redisPubSub.getPublisher().disconnect();
			this.redisPubSub.getSubscriber().disconnect();
		}
	}
	static registerRedisPubSub(): DynamicModule {
		const redisPubSubProvider = {
			provide: 'REDIS_PUB_SUB_PROVIDER',
			useFactory: async (service: RedisService) => {
				const option = await service.getConfig();
				return option;
			},
			inject: [RedisService],
		};
		const providers = [redisPubSubProvider];
		return {
			module: RedisModule,
			providers,
			exports: providers,
		};
	}
}
