import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';
// import orders from '../dummyData/fakeOrder';

/* global it, describe */
describe('/POST order', () => {
  it('it should not POST when an invalid mealId is given', (done) => {
    const id = { mealId: 'd34' };
    request(app)
      .post('/api/v1/orders')
      .send(id)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Input a valid mealId');
        done();
      });
  });
  it('it should POST an order', (done) => {
    const id = { mealId: 1222 };
    request(app)
      .post('/api/v1/orders')
      .send(id)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Meal added to order');
        done();
      });
  });
  it('it should return a 404 error', (done) => {
    const id = { mealId: 4 };
    request(app)
      .post('/api/v1/orders')
      .send(id)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Meal not found');
        done();
      });
  });
});
