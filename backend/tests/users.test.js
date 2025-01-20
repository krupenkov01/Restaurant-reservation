import request from 'supertest';
import app from '../app';  

describe('Comments API', () => {
  it('should return a list of comments', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);  

  
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);  
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('email');
    expect(response.body[0]).toHaveProperty('regpass');
    expect(response.body[0]).toHaveProperty('role');
  });
});
