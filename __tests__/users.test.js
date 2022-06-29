const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserServices');

const mockUser = {
  username: 'Test',
  email: 'test@example.gov',
  password: '123456',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);

  const user = await UserService.create({ ...mockUser, ...userProps});

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should create new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { username, email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      username,
      email,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
