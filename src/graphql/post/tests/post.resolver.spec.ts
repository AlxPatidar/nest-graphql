import { PostResolver } from '../post.resolver';

describe('PostResolver', () => {
  let resolver: PostResolver;

  beforeEach(async () => {
    resolver = global.app.get<PostResolver>(PostResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
