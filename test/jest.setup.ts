import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import IORedis from 'ioredis-mock'

import { AppModule } from '../src/app/app.module';
import { RedisService } from 'src/config/redis/redis';

let app: NestExpressApplication;

// create redis instance on redis mock lib
const redis = new IORedis()
// override getConfig function of redis services
const mockRedisServices = {
  async getConfig() {
    return new RedisPubSub({
      publisher: redis.createConnectedClient(),
      subscriber: redis,
    })
  },
}

beforeAll(async () => {
  console.log("Jest Setup Initialize")
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
  .overrideProvider(RedisService)
  .useValue(mockRedisServices)
  .compile();
  app = moduleFixture.createNestApplication();
  global.app = app
  await app.init();
})

afterAll(async () => {
  console.log("Jest Setup Close")
  await app.close()
})
