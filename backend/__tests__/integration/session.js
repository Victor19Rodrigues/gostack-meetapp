import request from 'supertest';

import app from '../../src/app';

import factory from '../factories';
import truncate from '../utils/truncate';

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '159357',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '159357',
      });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '159357',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '159357',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '159357',
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should not be able authenticate when not send email', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        password: '159357',
      });

    expect(response.body.error).toBe('Email is a required field');
  });

  it('should not be able authenticate when send invalid email', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'vitor1908',
        password: '159357',
      });

    expect(response.body.error).toBe('email must be a valid email');
  });

  it('should not be able authenticate when user not exist', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'vitor1908@hotmail.com.br',
        password: '159357',
      });

    expect(response.body.error).toBe('User not found');
  });

  it('should not be able authenticate when not send password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'vitor1908@gmail.com',
      });

    expect(response.body.error).toBe('Password is a required field');
  });
});
