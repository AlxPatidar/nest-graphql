import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from '@Logger/logger.module';
import { ConfigModule } from '../config/config.module';
import { ApiModule } from '../api/api.module';
import { GraphqlModule } from '../graphql/graphql.module';
import {
	EnvironmentModule,
	EnvironmentService,
} from '../config/environment/environment';
import { MongoModule, MongoService, IMongoSecret } from '../config/mongo/mongo';

@Module({
	imports: [
		// api module for tasks related restFul API
		ApiModule,
		// graphql module for graphql resolvers
		GraphqlModule,
		// configuration module for get environment and mongo
		ConfigModule,
		LoggerModule.forRoot(),
		// GraphQLModule for get graphql based function like playground
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
			// enable playground for /graphql endpoint
			playground: true,
			// for enable subscriptions
			installSubscriptionHandlers: true,
		}),
		// use typegoose for type based schema or database interaction
		TypegooseModule.forRootAsync({
			imports: [EnvironmentModule, MongoModule],
			inject: [EnvironmentService, MongoService],
			useFactory: async (
				env: EnvironmentService,
				mongoService: MongoService
			) => {
				const config: IMongoSecret = {
					uri: `mongodb://${env.get('DB_HOST')}:${env.get('DB_PORT')}/${env.get(
						'DB_DATABASE'
					)}`,
					type: env.get('DB_TYPE'),
					host: env.get('DB_HOST'),
					port: env.get('DB_PORT'),
					username: env.get('DB_USERNAME'),
					password: env.get('DB_PASSWORD'),
					database: env.get('DB_DATABASE'),
					entities: [__dirname + './../../**/**.entity{.ts,.js}'],
					synchronize: env.isEnv('development'),
				};
				return await mongoService.getConfig(config);
			},
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
