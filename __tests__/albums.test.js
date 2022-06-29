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
  
  const user = await UserService.create({ ...mockUser, ...userProps });
  
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should be able to get all albums', async () => {
    const [agent] = await registerAndLogin();
    const album = await album.insert({ album_name: 'testAlbum', artist: 'testArtist', genre: 'testGenre', release_date: '1999' });
    const response = await agent
      .get('/api/v1/albums');

    expect(response.body).toEqual(album);
  });
  afterAll(() => {
    pool.end();
  });
});
