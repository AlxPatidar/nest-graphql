import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskSchema } from './task.entity';

@Module({
	imports: [TypegooseModule.forFeature([TaskSchema])],
	providers: [TaskService],
	controllers: [TaskController],
})
export class TaskModule {}
