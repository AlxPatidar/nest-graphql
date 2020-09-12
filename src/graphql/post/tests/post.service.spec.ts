import { PostService } from '../post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    service = global.app.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
