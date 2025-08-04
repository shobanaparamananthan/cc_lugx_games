const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('Game Service Integration Tests', () => {
  it('GET /health should return service status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Game Service is running');
  });

  it('POST /games should add a new game', async () => {
    const res = await request(app).post('/games').send({
      name: "Test Game",
      category: "Action",
      release_date: "2024-01-01",
      price: 59.99
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Game added');
    expect(res.body).toHaveProperty('id');
  });

  it('GET /games should return game list', async () => {
    const res = await request(app).get('/games');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
afterAll(() => {
  db.end(); // this will close the DB connection after all tests
});
});

