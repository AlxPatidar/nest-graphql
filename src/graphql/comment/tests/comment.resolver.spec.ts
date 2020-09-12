import { CommentResolver } from '../comment.resolver';

describe('CommentResolver', () => {
  let resolver: CommentResolver;

  beforeEach(async () => {
    resolver = global.app.get<CommentResolver>(CommentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
