import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

import { TaskSchema, TaskDocument } from './task.entity';
import { CreateTaskDto } from './interfaces/create.task.dto';

@Injectable()
export class TaskService {
	constructor(
		@InjectModel(TaskSchema)
		private readonly taskRepository: ReturnModelType<typeof TaskSchema>
	) {}
	// Create task list using model save
	async createTask(createCatDto: CreateTaskDto): Promise<TaskDocument> {
		const createdTask = new this.taskRepository(createCatDto);
		return await createdTask.save();
	}

	// Get task list from database
	async findAll(): Promise<TaskDocument[]> {
		return await this.taskRepository.find();
	}

	// Get task item from database
	async getTask(taskId): Promise<TaskDocument> {
		return await this.taskRepository.findOne({ _id: taskId });
	}

	// Update task item
	async updateTask(taskId: string, task: CreateTaskDto): Promise<TaskDocument> {
		const updateTask: any = {};
		if (task.title) {
			updateTask.title = task.title;
		}
		if (task.completed || !task.completed) {
			updateTask.completed = task.completed;
		}
		return await this.taskRepository.findByIdAndUpdate(taskId, updateTask, {
			new: true,
		});
	}

	// Remove task from database using findOneAndDelete method
	async deleteTask(taskId): Promise<TaskDocument> {
		return await this.taskRepository.findOneAndDelete({ _id: taskId });
	}
}
