import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';

/* global it, describe */
describe('/POST user', () => {
  it('it should not create a user without the username field', (done) => {
    const user = {
      password: 'dssf',
      address: 'fsegjjbjbj',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.errors.username.msg).to.equal('Username cannot be empty.');
        done();
      });
  });
  it('it should not create an existing user', (done) => {
    const user = {
      username: 'bekomay26',
      password: 'dssfbchghgc',
      address: 'fsegjjbjbjbgbdbgfbgbfbffg',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.equal(`${user.username} already exists`);
        done();
      });
  });
  it('it should create a non-existing user', (done) => {
    const user = {
      username: 'bekomahsa26',
      password: 'dfngfnfnfgssf',
      address: 'fsegjjbjbgbfbbgfxbbgfbffgj',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('User Created');
        done();
      });
  });
});


describe('/POST login', () => {
  it('it should give error for invalid username or password', (done) => {
    const user = {
      username: 'bekomay26',
      password: 'dssfjkgfkjgfj',
    };
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.message).to.equal('Invalid username or password');
        done();
      });
  });
  it('it should login an existing user', (done) => {
    const user = {
      username: 'bekomay26',
      password: 'Crimson26',
    };
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal(`Welcome, ${user.username}`);
        done();
      });
  });
});
