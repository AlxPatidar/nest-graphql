import { Module } from '@nestjs/common';

import { EnvironmentModule }from './environment/environment'
import { MongoModule }from './mongo/mongo'
import { RedisModule }from './redis/redis'

const config = [EnvironmentModule, MongoModule, RedisModule]

@Module({
  imports: config,
  exports: config,
  providers: []
})
export class ConfigModule {}
