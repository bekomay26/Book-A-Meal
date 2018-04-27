import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';

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
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Input a valid quantity');
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

describe('/GET order for certain day', () => {
  it('it should return a 400 status', (done) => {
    request(app)
      .get('/api/v1/orders/21-er')
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Input valid date parameter in format yyyy-mm-dd');
        done();
      });
  });
  it('it should return a 200 status', (done) => {
    request(app)
      .get('/api/v1/orders/2221-1-23')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Orders for 2221/1/23 retrieved');
        done();
      });
  });
  it('it should return a 404 status', (done) => {
    request(app)
      .get('/api/v1/orders/2221-4-26')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('No order for 2221/4/26 was found');
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
        expect(res.body.message).to.equal('You cannot delete an order after 10 seconds');
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
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Order deleted');
        done();
      });
  });
});
