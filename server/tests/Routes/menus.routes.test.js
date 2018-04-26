import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';
import menus from '../dummyData/fakeMenus';

// import chaiHttp from 'chai-http';
// chai.expect();
// const { expect } = chai.expect;
// chai.use(chaiHttp);

/* global it, describe */
describe('/POST menu', () => {
  it('it should not POST a menu without a required field', (done) => {
    const menu = {
      date: '26/14/2018',
      createdBy: 'fola',
      editedBy: 'ayomide',
    };
    request(app)
      .post('/api/v1/menus')
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Input required missing field');
        done();
      });
  });
  it('it should POST a meal ', (done) => {
    const menu = {
      date: '26/14/2018',
      meals: ['meal1', 'meal2'],
      createdBy: 'fola',
      editedBy: 'ayomide',
    };
    request(app)
      .post('/api/v1/menus')
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
});

describe('/PUT meal', () => {
  it('it should not POST for a menu for a day that already has a menu', (done) => {
    const oldMenu = {
      id: 1111,
      date: '22/10/2019',
      meals: ['fff', 'fddd'],
      createdBy: 'ffffff',
      editedBy: ['eee', 'ddd'],
    };
    menus.push(oldMenu);
    const menu = {
      date: '22/10/2019',
      meals: ['meal1', 'meal2'],
      createdBy: 'fola',
      editedBy: 'ayomide',
    };
    request(app)
      .post('/api/v1/menus')
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.equal(`Menu for the date ${oldMenu.date} already exists`);
        done();
      });
  });
});
