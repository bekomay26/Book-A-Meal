import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';
import menus from '../dummyData/fakeMenus';

/* global it, describe */
describe('/POST menu', () => {
  it('it should not POST a menu without a required field', (done) => {
    const menu = {
      date: '26/14/2018',
      createdBy: 'fola',
      editedBy: 'ayomide',
    };
    request(app)
      .post('/api/v1/menu')
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
    const initialLength = menus.length;
    request(app)
      .post('/api/v1/menu')
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.menus.length).to.equal(initialLength + 1);
        done();
      });
  });
  it('it should not POST for a menu for a day that already has a menu', (done) => {
    const oldMenu = {
      id: 1111,
      date: '2018-3-4',
      meals: ['fff', 'fddd'],
      createdBy: 'ffffff',
      editedBy: ['eee', 'ddd'],
    };
    menus.push(oldMenu);
    const menu = {
      date: '2018-3-4',
      meals: ['meal1', 'meal2'],
      createdBy: 'fola',
      editedBy: 'ayomide',
    };
    request(app)
      .post('/api/v1/menu')
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.equal(`Menu for the date ${oldMenu.date} already exists`);
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
  it('it should return a 404 status', (done) => {
    menus.splice(0, 1);
    request(app)
      .get('/api/v1/menu')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('There is no menu for today');
        done();
      });
  });
});


describe('/DELETE menu', () => {
  it('it should not DELETE a menu that is not found', (done) => {
    request(app)
      .delete('/api/v1/menu/2119')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Cannot find menu with id 2119');
        done();
      });
  });
  it('it should DELETE a menu ', (done) => {
    const initialLength = menus.length;
    request(app)
      .delete('/api/v1/menu/2112')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Menu deleted');
        expect(res.body.menus.length).to.equal(initialLength - 1);
        done();
      });
  });
});
