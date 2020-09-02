import { ConnectionOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export interface IMongoSecret {
  type: string;
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  entities: any;
  uri: string;
  synchronize: boolean;
}

// optimal for on-premise
export const defaultMongoConnectionOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10,
  keepAlive: true,
};

@Injectable()
export class MongoService {
  // export configuration
  public async getConfig(
    secret: IMongoSecret
  ): Promise<TypegooseModuleOptions> {
    return {
      ...defaultMongoConnectionOptions,
      dbName: secret.database,
      uri: secret.uri,
    };
  }
}
