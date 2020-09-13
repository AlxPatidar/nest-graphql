import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import Mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server';

import { MongoService } from '../src/config/mongo/mongo';
import { AppModule } from '../src/app/app.module';

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

beforeAll(async () => {
  // create mongo memory replica set instance
  mongoServer = await MongoMemoryServer.create();
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
  const connection: Mongoose.Connection = app.get('DefaultTypegooseConnection')
  // close connection
  if (connection) await connection.close()
  // remove mongo replica
  await mongoServer.stop()
  // on end of test close app
  await app.close()
})
