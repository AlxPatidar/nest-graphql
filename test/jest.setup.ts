import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import Mongoose from 'mongoose'
import { MongoMemoryReplSet } from 'mongodb-memory-server-global'

import { MongoService } from '../src/config/mongo/mongo';
import { AppModule } from '../src/app/app.module';

let app: NestExpressApplication;
let mongoServer: MongoMemoryReplSet;

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
const mongooseConnection = async (nestApp: INestApplication) => {
  const connection = nestApp.get('DefaultTypegooseConnection')
  for (const modelName in connection.models) {
    if (connection.models.hasOwnProperty(modelName)) {
      const model = connection.models[modelName]
      await model.ensureIndexes()
    }
  }
}

beforeAll(async () => {
  // create mongo memory replica set instance
  mongoServer = new MongoMemoryReplSet({
    replSet: { storageEngine: 'wiredTiger' },
  })
  // run replica server
  await mongoServer.waitUntilRunning()
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(MongoService)
    .useValue(mockMongoConfig)
    .compile();
  app = moduleFixture.createNestApplication();
  global.app = app
  await app.init();
  await mongooseConnection(app)
})

afterAll(async () => {
  jest.resetAllMocks()
  jest.restoreAllMocks()
  // on end of test close app
  await app.close()
  const connection: Mongoose.Connection = app.get('DefaultTypegooseConnection')
  if (connection) {
    await connection.dropDatabase()
  }
  // remove mongo replica
  await mongoServer.stop()
})
