import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';
import orders from '../dummyData/fakeOrder';

/* global it, describe */
describe('/POST order', () => {
  it('it should not POST when an invalid mealId is given', (done) => {
    const id = { mealId: 'd34' };
    request(app)
      .post('/api/v1/orders')
      .send(id)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.errors.mealId.msg).to.equal('Parameter must be an integer');
        expect(res.body.errors.address.msg).to.equal('Address cannot be empty.');
        done();
      });
  });
  it('it should POST an order', (done) => {
    const id = { mealId: 1222, address: '6, gbagada street' };
    const initialLength = orders.length;
    request(app)
      .post('/api/v1/orders')
      .send(id)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Meal added to order');
        expect(res.body.orders.length).to.equal(initialLength + 1);
        expect(res.body.orders[initialLength].address).to.equal('6, gbagada street');
        done();
      });
  });
  it('it should return a 404 error', (done) => {
    const id = {
      mealId: 4,
      address: 'sffsfsfgncnggggcgcfcfbjhhvh',
    };
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

describe('/PUT order', () => {
  it('it should return an error for invalid input', (done) => {
    const meal = {
      extras: ['rice', 'potato'],
      qty: 's1',
    };
    request(app)
      .put('/api/v1/orders/3111')
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.errors.qty.msg).to.equal('Parameter must be an integer');
        done();
      });
  });
  it('it should edit the order', (done) => {
    const meal = {
      extras: ['rice', 'potato'],
      qty: 2,
    };
    request(app)
      .put('/api/v1/orders/3111')
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Order Updated');
        expect(res.body.Order.meal.qty).to.equal(meal.qty);
        done();
      });
  });
  // To cover the branch on line 56 of controller
  it('it should edit the order if extras is not given', (done) => {
    const meal = {
      qty: 2,
    };
    request(app)
      .put('/api/v1/orders/3111')
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Order Updated');
        expect(res.body.Order.meal.qty).to.equal(meal.qty);
        done();
      });
  });
  it('it should give a not found error', (done) => {
    const meal = {
      extras: ['rice', 'potato'],
      qty: 2,
    };
    request(app)
      .put('/api/v1/orders/3114')
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Cannot find order with id 3114');
        done();
      });
  });
});

describe('/GET orders', () => {
  it('it should return a 200 status', (done) => {
    request(app)
      .get('/api/v1/orders')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Orders retrieved');
        done();
      });
  });
});


describe('/DELETE order', () => {
  it('it should return a 400 status', (done) => {
    request(app)
      .delete('/api/v1/orders/3121')
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('You cannot delete an order after 50 seconds');
        done();
      });
  });
  it('it should return a 404 status', (done) => {
    request(app)
      .delete('/api/v1/orders/32')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Cannot find order with id 32');
        done();
      });
  });
  it('it should return a 200 status', (done) => { // Dont keep on top would have deleted the item
    request(app)
      .delete('/api/v1/orders/3111')
      .end((err, res) => {
        const initialLength = orders.length;
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Order deleted');
        expect(res.body.newOrders.length).to.equal(initialLength - 1);
        done();
      });
  });
});
