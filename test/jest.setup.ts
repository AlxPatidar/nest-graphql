import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import Mongoose from 'mongoose'
import * as IORedis from 'ioredis-mock'
import { MongoMemoryServer } from 'mongodb-memory-server';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { AppModule } from '../src/app/app.module';
import { RedisService } from '../src/config/redis/redis';
import { MongoService } from '../src/config/mongo/mongo';

let app: NestExpressApplication;
let mongoServer: MongoMemoryServer;

// mocking mongo service configuration using override getConfig function
const mockMongoConfig = {
  async getConfig() {
    const mongoUri = await mongoServer.getConnectionString()
    return {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      uri: mongoUri,
    }
  },
}
// mongoose connection with every model of typegoose
const mongooseConnection = async (nestApp: NestExpressApplication) => {
  const connection = nestApp.get('DefaultTypegooseConnection')
  for (const modelName in connection.models) {
    if (connection.models.hasOwnProperty(modelName)) {
      const model = connection.models[modelName]
      await model.ensureIndexes()
    }
  }
}
// create redis instance on redis mock lib
const redis = new IORedis()
// override getConfig function of redis services
const mockRedisConfig = {
  async getConfig() {
    return new RedisPubSub({
      publisher: redis.createConnectedClient(),
      subscriber: redis,
    })
  },
}

beforeAll(async () => {
  // create mongo memory replica set instance
  mongoServer = await MongoMemoryServer.create();
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(MongoService)
    .useValue(mockMongoConfig)
    .overrideProvider(RedisService)
    .useValue(mockRedisConfig)
    .compile();
  app = moduleFixture.createNestApplication();
  global.app = app
  await app.init();
  await mongooseConnection(app)
})

afterAll(async () => {
  const connection: Mongoose.Connection = app.get('DefaultTypegooseConnection')
  // close connection
  if (connection) await connection.close()
  // remove mongo replica
  await mongoServer.stop()
  // on end of test close app
  await app.close()
})
