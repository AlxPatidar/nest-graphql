import { parse } from 'dotenv';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvironmentService {
	private readonly envEnvironment: { [key: string]: string };

	constructor() {
		const filePath = '.env';
		this.envEnvironment = parse(readFileSync(resolve(filePath)));
	}

	get(key: string): string {
		return this.envEnvironment[key];
	}

	isEnv(env: string) {
		return this.envEnvironment.APP_ENV === env;
	}
}
