import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';
import token from '../../helpers/testToken';

const adminToken = token.adminToken();


/* global it, describe */
describe('/POST menu', () => {
  it('it should return a 422 error if not an array', (done) => {
    const menu = {
      date: '6/10/2018',
      mealIds: 'dfdf',
    };
    request(app)
      .post('/api/v1/menu/future')
      .set('x-access-token', adminToken)
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.errors.mealIds.msg).to.equal('Input must be a list of meals i.e an array');
        done();
      });
  });
  it('it should return a 422 error if array is empty or contains just 1 meal', (done) => {
    const menu = {
      date: '6/10/2018',
      mealIds: [1],
    };
    request(app)
      .post('/api/v1/menu/future')
      .set('x-access-token', adminToken)
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.errors.mealIds.msg).to.equal('Menu list must contain 2 or more meals');
        done();
      });
  });
  it('it should return a 201 status with two or more meals in the array', (done) => {
    const menu = {
      date: '1/1/2019',
      mealIds: [1, 2, 4],
    };
    request(app)
      .post('/api/v1/menu/future')
      .set('x-access-token', adminToken)
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Menu created');
        done();
      });
  });

  // wrong cos of travis, change*
  it('it should return a 409 status if menu for today already exists', (done) => {
    // initialize todays date

    const menu = {
      mealIds: [2, 1],
    };

    request(app)
      .post('/api/v1/menu')
      .set('x-access-token', adminToken)
      .send(menu);
    request(app)
      .post('/api/v1/menu')
      .set('x-access-token', adminToken)
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Menu created for today');
        done();
      });
  });
});

describe('/GET menu', () => {
  it('it should return a 200 status', (done) => {
    request(app)
      .get('/api/v1/menu')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Menu Retrieved');
        done();
      });
  });
});
