import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';
import token from '../../helpers/testToken';

// const adminToken = token.adminToken();
const adminToken = token.adminGenToken();

/* global it, describe */
describe('/POST order', () => {
  it('it should not POST when an invalid mealId is given', (done) => {
    const id = { mealId: 'd34' };
    request(app)
      .post('/api/v1/orders')
      .set('x-access-token', adminToken)
      .send(id)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.errors.mealId.msg).to.equal('mealId must be an integer');
        done();
      });
  });
  it('it should not POST when an extraIds array contains a non-integer element', (done) => {
    const id =
    {
      mealId: 1,
      extraIds: ['sd3s', 2],
      qtys: [2],
      address: 'fdbhxjvhxvmxhvhxvhxvhxv',
    };
    request(app)
      .post('/api/v1/orders')
      .set('x-access-token', adminToken)
      .send(id)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.message).to.equal('Extra IDs must be of type Integer');
        done();
      });
  });

  it('it should POST an order', (done) => {
    const id =
    {
      mealId: 1,
      extraIds: [3, 2],
      qtys: [2],
      address: 'fdbhxjvhxvmxhvhxvhxvhxv',
    };
    request(app)
      .post('/api/v1/orders')
      .set('x-access-token', adminToken)
      .send(id)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Order created');
        done();
      });
  });

  it('it should POST an order if there are no extras', (done) => {
    const id =
    {
      mealId: 1,
      extraIds: [],
      qtys: [],
      address: 'fdbhxjvhxvmxhvhxvhxvhxv',
    };
    request(app)
      .post('/api/v1/orders')
      .set('x-access-token', adminToken)
      .send(id)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Order created');
        done();
      });
  });

  it('it should return a 404 error', (done) => {
    const id = {
      mealId: 9,
      extraIds: [3, 2, 2],
      address: 'fdbhxjvhxvmxhvhxvhxvhxv',
    };
    request(app)
      .post('/api/v1/orders')
      .set('x-access-token', adminToken)
      .send(id)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Meal not found');
        done();
      });
  });
  // wrong cos of travis, change* msg
  it('it should return a 404 error', (done) => {
    const id = {
      mealId: 2,
      extraIds: [9, 1],
      address: 'fdbhxjvhxvmxhvhxvhxvhxv',
    };
    request(app)
      .post('/api/v1/orders')
      .set('x-access-token', adminToken)
      .send(id)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Extra is not served with this particular meal');
        done();
      });
  });
  it('it should return a 404 error if one of the extras chosen is not served with the meal', (done) => {
    const id =
    {
      mealId: 1,
      extraIds: [3, 4, 2],
      address: 'fdbhxjvhxvmxhvhxvhxvhxv',
    };
    request(app)
      .post('/api/v1/orders')
      .set('x-access-token', adminToken)
      .send(id)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Extra is not served with this particular meal');
        done();
      });
  });
});

describe('/PUT order', () => {
  it('it should return an error for invalid input', (done) => {
    const meal = {
      extras: ['rice', 'potato'],
      qtys: 's1',
    };
    request(app)
      .put('/api/v1/orders/1')
      .set('x-access-token', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.errors.qtys.msg).to.equal('qtys field must be an array');
        done();
      });
  });
  it('it should edit the order', (done) => {
    const meal = {
      extras: [1, 3],
      qty: [2],
    };
    request(app)
      .put('/api/v1/orders/1')
      .set('x-access-token', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Order Updated');
        done();
      });
  });
  it('it should update order status', (done) => {
    const order = {
      status: 'Completed',
    };
    request(app)
      .put('/api/v1/orders/status/1')
      .set('x-access-token', adminToken)
      .send(order)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Order Status Updated');
        done();
      });
  });

  it('it should not update order status due to invalid status', (done) => {
    const order = {
      status: 'Finished',
    };
    request(app)
      .put('/api/v1/orders/status/1')
      .set('x-access-token', adminToken)
      .send(order)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.message).to.equal('Invalid status');
        done();
      });
  });

  it('it should not update a non existing order', (done) => {
    const order = {
      status: 'Completed',
    };
    request(app)
      .put('/api/v1/orders/status/99')
      .set('x-access-token', adminToken)
      .send(order)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Cannot find order with id 99');
        done();
      });
  });
  // To cover the branch on line 56 of controller
  it('it should edit the order if extras is not given', (done) => {
    const meal = {
      qty: [1, 2],
    };
    request(app)
      .put('/api/v1/orders/1')
      .set('x-access-token', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Order Updated');
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
      .set('x-access-token', adminToken)
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
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Orders retrieved');
        done();
      });
  });
  it('it should return a 200 status', (done) => {
    request(app)
      .get('/api/v1/orders')
      .set('x-access-token', token.userToken())
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('My Orders retrieved');
        done();
      });
  });
});

describe('/GET filter orders', () => {
  it('it should return a 422 status', (done) => {
    request(app)
      .get('/api/v1/orders/filter?statuses=Pending&fromDate=2019-30-01&toDate=9808')
      .set('x-access-token', token.adminToken())
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.message).to.equal('Input a valid date');
        done();
      });
  });
  it('it should return a 422 status', (done) => {
    request(app)
      .get('/api/v1/orders/filter?fromDate=11-11-2017&toDate=2019-30-01')
      .set('x-access-token', token.adminToken())
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.message).to.equal('Input a valid date');
        done();
      });
  });
});

// describe('/GET order for certain day', () => {
//   it('it should return a 400 status', (done) => {
//     request(app)
//       .get('/api/v1/orders/21-er')
//       .set('x-access-token', adminToken)
//       .end((err, res) => {
//         expect(res.statusCode).to.equal(400);
//         expect(res.body.message).to.equal('Input valid date parameter in format yyyy-mm-dd');
//         done();
//       });
//   });
//   it('it should return a 200 status', (done) => {
//     request(app)
//       .get('/api/v1/orders/2221-1-23')
//       .set('x-access-token', adminToken)
//       .end((err, res) => {
//         expect(res.statusCode).to.equal(200);
//         expect(res.body.message).to.equal('Orders for 2221/1/23 retrieved');
//         done();
//       });
//   });
//   it('it should return a 404 status', (done) => {
//     request(app)
//       .get('/api/v1/orders/2221-4-26')
//       .set('x-access-token', adminToken)
//       .end((err, res) => {
//         expect(res.statusCode).to.equal(404);
//         expect(res.body.message).to.equal('No order for 2221/4/26 was found');
//         done();
//       });
//   });
// });

describe('/DELETE order', () => {
//   it('it should return a 400 status', (done) => {
//     request(app)
//       .delete('/api/v1/orders/1')
//       .set('x-access-token', adminToken)
//       .end((err, res) => {
//         expect(res.statusCode).to.equal(400);
//         expect(res.body.message).to.equal('You cannot delete an order after 10 seconds');
//         done();
//       });
//   });
  it('it should return a 404 status', (done) => {
    request(app)
      .delete('/api/v1/orders/32')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Cannot find order with id 32');
        done();
      });
  });
  it('it should return a 200 status', (done) => { // Dont keep on top would have deleted the item
    request(app)
      .delete('/api/v1/orders/1')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Order deleted');
        done();
      });
  });
});

