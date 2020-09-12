import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../src/app/app.module';

let app: NestExpressApplication;

beforeAll(async () => {
  console.log("Jest Setup Initialize")
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleFixture.createNestApplication();
  global.app = app
  await app.init();
})

afterAll(async () => {
  console.log("Jest Setup Close")
  await app.close()
})
