import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';
import meals from '../dummyData/fakeMeal';

// import chaiHttp from 'chai-http';
// chai.expect();
// const { expect } = chai.expect;
// chai.use(chaiHttp);

/* global it, describe */
describe('/POST meal', () => {
  it('it should not POST a meal without the price field', (done) => {
    const meal = {
      title: 'Bread',
      description: 'Bread Bread',
      image: 'fgffh',
    };
    request(app)
      .post('/api/v1/meals')
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.errors.price.msg).to.equal('Price cannot be empty.');
        done();
      });
  });
  it('it should return a 422 error for invalid fields', (done) => {
    const meal = {
      title: '  ',
      description: 'sffdfd,l;lg',
      image: 'fgffh',
      price: 'fd'
    };
    request(app)
      .post('/api/v1/meals')
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.title.msg).to.equal('Title cannot be empty.');
        expect(res.body.errors.price.msg).to.equal('Price must be an integer decimals not allowed');
        done();
      });
  });
  it('it should POST a meal ', (done) => {
    const meal = {
      title: 'Bread',
      description: 'Bread Bread',
      image: 'fgffh',
      price: 999,
    };
    const initialLength = meals.length;
    request(app)
      .post('/api/v1/meals')
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Meal created');
        expect(res.body.meals.length).to.equal(initialLength + 1);
        expect(res.body.meals[initialLength].description).to.equal('Bread Bread');
        done();
      });
  });
});

describe('/PUT meal', () => {
  it('it should not POST a meal that is not found', (done) => {
    const meal = {
      title: 'Bread',
      description: 'Bread Bread',
      image: 'fgffh',
    };
    request(app)
      .put('/api/v1/meals/1114')
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Cannot find meal with id 1114');
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
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('meal updated');
        expect(res.body.meal.description).to.equal('Bread Bread');
        expect(res.body.meal.id).to.equal(1111);
        done();
      });
  });
  it('it should PUT a meal without any field inputed', (done) => {
    const meal = {};
    request(app)
      .put('/api/v1/meals/1111')
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
        expect(res.body.message).to.equal(`Cannot find meal with id ${1114}`);
        done();
      });
  });
  it('it should DELETE a meal ', (done) => {
    const initialLength = meals.length;
    request(app)
      .delete('/api/v1/meals/1111')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Meal deleted');
        expect(res.body.meals.length).to.equal(initialLength - 1);
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
        expect(res.body.message).to.equal('Meals retrieved');
        done();
      });
  });
});
