import { CommentService } from '../comment.service';

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(async () => {
    service = global.app.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
