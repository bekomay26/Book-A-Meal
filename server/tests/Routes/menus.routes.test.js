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

describe('/GET menus', () => {
  it('it should return a 200 status', (done) => {
    request(app)
      .get('/api/v1/menus')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Menus retrieved');
        done();
      });
  });
});


describe('/PUT meal', () => {
  it('it should not PUT a menu for a previous or current date', (done) => {
    const menu = {
      meals: ['meal1', 'meal2'],
    };
    request(app)
      .put('/api/v1/menus/2018-01-24')
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('You cannot edit previous or today\'s menu');
        done();
      });
  });
  it('it should PUT a menu for an existing menu', (done) => {
    const menu = {
      meals: ['meal1', 'meal2'],
    };
    request(app)
      .put('/api/v1/menus/2019-02-14')
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Menu Updated');
        done();
      });
  });

  it('it should not PUT a menu for a non-existing menu', (done) => {
    const menu = {
      meals: ['meal1', 'meal2'],
    };
    request(app)
      .put('/api/v1/menus/2020-02-14')
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Cannot find menu for date 2020/02/14');
        done();
      });
  });
});

describe('/DELETE menu', () => {
  it('it should not DELETE a menu that is not found', (done) => {
    request(app)
      .delete('/api/v1/menus/2119')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Cannot find menu with id 2119');
        done();
      });
  });
  it('it should DELETE a menu ', (done) => {
    request(app)
      .delete('/api/v1/menus/2111')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Menu deleted');
        done();
      });
  });
});
