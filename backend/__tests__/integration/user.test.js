import request from 'supertest';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import app from '../../src/app';

import User from '../../src/app/models/User';

import factory from '../factories';
import truncate from '../utils/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should not be able to register when send password with less 6 characters', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'João',
        email: 'joao@gmail.com.br',
        password: '123',
      });
    expect(response.body.error).toBe('password must be at least 6 characters');
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should not be able to register when not send name', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'vitor1908@gmail.com',
        password: '123456',
      });

    expect(response.body.error).toBe('name is a required field');
  });

  it('should not be able to register when not send email', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Victor Rodrigues',
        password: '123456',
      });

    expect(response.body.error).toBe('e-mail is a required field');
  });

  it('should not be able to register when not send password', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Victor Rodrigues',
        email: 'vitor1908@gmail.com',
      });

    expect(response.body.error).toBe('password is a required field');
  });
});
