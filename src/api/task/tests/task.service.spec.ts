import { TaskService } from '../task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    service = global.app.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
