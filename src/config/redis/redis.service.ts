import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class RedisService {
	public async getConfig(): Promise<RedisPubSub> {
		const options = {
          host: 'localhost',
          port: 6379,
        };
		const config = new RedisPubSub({
			publisher: new Redis(options),
			subscriber: new Redis(options),
		});
		return config;
	}
}
