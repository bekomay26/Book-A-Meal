import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';
import menus from '../dummyData/fakeMenus';


/* global it, describe */
describe('/POST menu', () => {
  it('it should return a 400 error if not an array', (done) => {
    const menu = { meals: 'meal1' };
    request(app)
      .post('/api/v1/menu')
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Input must be a list of meals i.e an array');
        done();
      });
  });
  it('it should return a 400 error if array is empty or contains just 1 meal', (done) => {
    const menu = { meals: ['meal1'] };
    request(app)
      .post('/api/v1/menu')
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Menu list must contain 2 or more meals');
        done();
      });
  });
  it('it should return a 201 status with two or more meals in the array', (done) => {
    const menu = { meals: ['meal1', 'meal2'] };
    request(app)
      .post('/api/v1/menu')
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('menu created');
        done();
      });
  });
  it('it should return a 409 status if menu for today already exists', (done) => {
    // initialize todays date
    const d = new Date();
    const todaysDate = `${d.getDate().toString()}/${(d.getMonth() + 1).toString()}/${d.getFullYear().toString()}`;
    // add meal for today into the database
    const oldMenu = {
      id: 1111,
      date: todaysDate,
      meals: ['fff', 'fddd'],
      createdBy: 'ffffff',
      editedBy: ['eee', 'ddd'],
    };
    menus.push(oldMenu);
    const menu = { meals: ['meal1', 'meal2'] };
    request(app)
      .post('/api/v1/menu')
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.equal(`Menu for today, the ${todaysDate} already exists`);
        done();
      });
  });
});

describe('/GET menu', () => {
  it('it should return a 200 status', (done) => {
    request(app)
      .get('/api/v1/menu')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Menu retrieved');
        done();
      });
  });
});
