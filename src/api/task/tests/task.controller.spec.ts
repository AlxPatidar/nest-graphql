import { TaskController } from '../task.controller';

describe('Task Controller', () => {
  let controller: TaskController;

  beforeEach(async () => {
    controller = global.app.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
