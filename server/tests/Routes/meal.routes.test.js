import { expect } from 'chai';
import request from 'supertest';
import token from '../../helpers/testToken';
import app from '../../app';
import meals from '../dummyData/fakeMeal';

/* global it, describe */
const adminToken = token.adminToken();
const userToken = token.userToken();
// let c;
describe('/POST meal', () => {
  it('it should not create a meal without the price field', (done) => {
    const meal = {
      title: 'Bread',
      description: 'Bread Bread',
      image: 'fgffh',
      extraIds: [1, 2],
    };
    request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.errors.price.msg).to.equal('Price cannot be empty.');
        done();
      });
  });
  it('it should not create a meal that already exists', (done) => {
    const meal = {
      title: 'rice',
      description: 'Bread Bread',
      image: 'fgffh',
      price: 220,
      extraIds: [1, 2],
    };
    request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.equal(`meal ${meal.title} exists`);
        done();
      });
  });
  it('it should not create a meal if one of the extras doesnt exist', (done) => {
    const meal = {
      title: 'salad',
      description: 'Bread Bread',
      image: 'fgffh',
      price: 290,
      extraIds: [1, 9],
    };
    request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Extra with id 9 not found');
        done();
      });
  });
  it('it should create a meal ', (done) => {
    const meal = {
      title: 'Pounded yam',
      description: 'Bread Bread',
      image: 'fgffh',
      price: 999,
      extraIds: [1, 2],
    };
    const initialLength = meals.length;
    request(app)
      .post('/api/v1/meals')
      .set('x-access-token', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Meal created');
        done();
      });
  });
});

describe('/PUT meal', () => {
  it('it should not PUT a meal with an existing title', (done) => {
    const meal = {
      title: 'beans',
      description: 'Bread Bread',
      image: 'fgffh',
    };
    request(app)
      .put('/api/v1/meals/4')
      .set('x-access-token', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.equal(`Cannot update this meal because the title ${meal.title} exists`);
        done();
      });
  });
  it('it should not PUT a meal that is not found', (done) => {
    const meal = {
      title: 'Noodles',
      description: 'Bread Bread',
      image: 'fgffh',
    };
    request(app)
      .put('/api/v1/meals/145')
      .set('x-access-token', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Cannot find meal with id 145');
        done();
      });
  });
  it('it should PUT a meal ', (done) => {
    const meal = {
      title: 'Noodles',
      description: 'Bread Bread',
      price: 999,
    };
    request(app)
      .put('/api/v1/meals/2')
      .set('x-access-token', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('meal updated');
        done();
      });
  });
  it('it should PUT a meal without any field inputed', (done) => {
    const meal = {};
    request(app)
      .put('/api/v1/meals/2')
      .set('x-access-token', adminToken)
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('meal updated');
        done();
      });
  });
});

describe('/DELETE meal', () => {
  it('it should not DELETE a meal that is not found', (done) => {
    request(app)
      .delete('/api/v1/meals/1114')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Cannot find meal with id 1114');
        done();
      });
  });
  it('it should DELETE a meal ', (done) => {
    const initialLength = meals.length;
    request(app)
      .delete('/api/v1/meals/3')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Meal deleted');
        done();
      });
  });
});

describe('/RETRIEVE meals', () => {
  it('it should RETRIEVE all meals ', (done) => {
    request(app)
      .get('/api/v1/meals/')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Meals retrieved');
        done();
      });
  });
});
