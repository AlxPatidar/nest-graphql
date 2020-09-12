import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    service = global.app.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
