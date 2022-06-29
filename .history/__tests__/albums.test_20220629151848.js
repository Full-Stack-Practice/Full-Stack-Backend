const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserServices');
const Album = require('../lib/models/Album');

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
    const [agent, user] = await registerAndLogin();
    const album = await Album.insert({ 
      album_name: 'testAlbum', 
      artist: 'testArtist', 
      genre: 'testGenre', 
      release_date: '1999', 
      user_id: user.id 
    });
    console.log(album);
    const response = await agent
      .get('/api/v1/albums');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(album);
  });
  afterAll(() => {
    pool.end();
  });
});
