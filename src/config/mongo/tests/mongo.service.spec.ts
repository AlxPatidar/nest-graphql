import { Test, TestingModule } from '@nestjs/testing';
import { MongoService } from '../mongo.service';

describe('RedisService', () => {
  let service: MongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoService],
    }).compile();

    service = module.get<MongoService>(MongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
