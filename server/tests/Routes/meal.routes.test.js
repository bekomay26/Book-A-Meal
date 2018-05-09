import { expect } from 'chai';
import request from 'supertest';
import token from '../../helpers/testToken';
import app from '../../app';

/* global it, describe */
const adminToken = token.adminToken();
const userToken = token.userToken();
describe('/POST meal', () => {
  it('it should not POST a meal without the price field', (done) => {
    const meal = {
      title: 'Bread',
      description: 'Bread Bread',
      image: 'fgffh',
      extraIds: [1, 2],
    };
    request(app)
      .post('/api/v1/meals')
      .set('Content-Type', 'application/json')
      .set('Authorization', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.error.title.msg).to.equal('Title cannot be empty.');
        done();
      });
  });
  it('it should POST a meal ', (done) => {
    const meal = {
      title: 'Bread',
      description: 'Bread Bread',
      image: 'fgffh',
      price: 999,
      extraIds: [1, 2],
    };
    request(app)
      .post('/api/v1/meals')
      .set('Authorization', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
});

describe('/PUT meal', () => {
  it('it should not PUT a meal that is not found', (done) => {
    const meal = {
      title: 'Bread',
      description: 'Bread Bread',
      image: 'fgffh',
    };
    request(app)
      .put('/api/v1/meals/1')
      .set('Authorization', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
  it('it should PUT a meal ', (done) => {
    const meal = {
      title: 'Bread',
      description: 'Bread Bread',
      image: 'fgffh',
      price: 999,
    };
    request(app)
      .put('/api/v1/meals/1111')
      .set('Authorization', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it('it should PUT a meal without any field inputed', (done) => {
    const meal = {};
    request(app)
      .put('/api/v1/meals/1111')
      .set('Authorization', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe('/DELETE meal', () => {
  it('it should not DELETE a meal that is not found', (done) => {
    request(app)
      .delete('/api/v1/meals/1114')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
  it('it should DELETE a meal ', (done) => {
    request(app)
      .delete('/api/v1/meals/1111')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe('/RETRIEVE meals', () => {
  it('it should RETRIEVE all meals ', (done) => {
    request(app)
      .get('/api/v1/meals/')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
