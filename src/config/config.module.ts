import { Module } from '@nestjs/common';

import { EnvironmentModule }from './environment/environment'
import { MongoModule }from './mongo/mongo'

const config = [EnvironmentModule, MongoModule]

@Module({
  imports: config,
  exports: config
})
export class ConfigModule {}
