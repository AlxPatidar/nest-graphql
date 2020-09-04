import {
	Get,
	Post,
	Delete,
	Body,
	Param,
	Put,
	Controller,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDocument } from './task.entity';
import { CreateTaskDto } from './interfaces/create.task.dto';

export interface TaskResponse {
	success: boolean;
	message: string;
	data: TaskDocument[] | TaskDocument;
}

@Controller('api/v1/tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}
	@Get()
	async getTasks(): Promise<TaskResponse> {
		const tasks: TaskDocument[] = await this.taskService.findAll();
		return {
			success: true,
			message: 'Task List fetch successfully.',
			data: tasks,
		};
	}

	@Get(':taskId')
	async getTask(@Param('taskId') taskId: string): Promise<TaskResponse> {
		const task = await this.taskService.getTask(taskId);
		return {
			success: true,
			message: 'Task item fetch successfully.',
			data: task,
		};
	}

	@Post()
	async addTask(@Body() task: CreateTaskDto): Promise<TaskResponse> {
		const tasks = await this.taskService.createTask(task);
		return {
			success: true,
			message: 'Task created successfully.',
			data: tasks,
		};
	}

	@Put(':taskId')
	async updateTask(
		@Param('taskId') taskId: string,
		@Body() task: CreateTaskDto
	): Promise<TaskResponse> {
		const updatedTask = await this.taskService.updateTask(taskId, task);
		return {
			success: true,
			message: 'Task updated successfully.',
			data: updatedTask,
		};
	}

	@Delete(':taskId')
	async deleteTask(@Param('taskId') taskId: string): Promise<TaskResponse> {
		const tasks = await this.taskService.deleteTask(taskId);
		return {
			success: true,
			message: 'Task deleted successfully.',
			data: tasks,
		};
	}
}
