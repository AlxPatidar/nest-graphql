import * as request from 'supertest';
import { Http2Server } from 'http2';

import { TaskService } from '../task.service';

describe('Task E2E Test', () => {
    let service: TaskService
    let server: Http2Server
    beforeEach(() => {
        service = global.app.get<TaskService>(TaskService)
        server = global.app.getHttpServer()
    });
    // get all task list using super test
    it('Get all task GET /api/v1/tasks', async () => {
        return request(server)
            .get('/api/v1/tasks')
            .expect(200)
            .expect((res: any) => {
                expect(res.body.success).toEqual(true)
                expect(res.body.message).toEqual('Task List fetch successfully.')
            })
    });
    // get all task item with task id
    it('Get task by taskId GET /api/v1/tasks/:taskId', async () => {
        // 5f537c498f222016e5a84cc2 is mongo task id for just testing
        const data = await service.getTask('5f537c498f222016e5a84cc2')
        return request(server)
            .get('/api/v1/tasks/5f537c498f222016e5a84cc2')
            .expect(200)
            .expect({
                success: true,
                message: 'Task item fetch successfully.',
                data
            })
    });
    // create new task item
    it('Create new task POST /api/v1/tasks', async () => {
        return request(server)
            .post('/api/v1/tasks')
            .send({
                "userId": "5f537c498f222016e5a84cc2",
                "title": "qui est esse",
                "body": "est rerum tempore vitae\nsequi"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect((res: any, err: Error) => {
                if (err) {
                    expect(err).toBeDefined();
                }
                expect(res.body.success).toEqual(true)
                expect(res.body.message).toEqual("Task created successfully.")
            })
    });
    // delete task item with task id
    it('Delete task DELETE /api/v1/tasks/:taskId', async () => {
        return request(server)
            .delete('/api/v1/tasks/5f537c498f222016e5a84cc1')
            .expect(200)
            .expect({
                "success": true,
                "message": "Task deleted successfully.",
                "data": null
            })
    });
    // update task item with task id
    it('Update task PUT /api/v1/tasks/:taskId', async () => {
        // update task item
        return request(server)
            // 5f537c498f222016e5a84cc1 is mongo taskId which is testing demo string  
            .put('/api/v1/tasks/5f537c498f222016e5a84cc1')
            .send({
                "userId": "5f537c498f222016e5a84cc2",
                "title": "qui est esse",
                "body": "est rerum tempore vitae\nsequi"
            })
            .expect(200)
            .expect({
                "success": true,
                "message": "Task updated successfully.",
                "data": null
            })
    });
});

