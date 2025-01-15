import request from 'supertest';
import app from '../app';  // Ваше приложение (например, Express)

describe('Restaurant API', () => {
  it('should return a list of restaurants', async () => {
    const response = await request(app)
      .get('/api/restaurants')
      .expect(200);  // Ожидаем статус код 200

    // Проверяем, что ответ содержит массив ресторанов
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);  // Проверяем, что есть хотя бы один ресторан
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });
});
