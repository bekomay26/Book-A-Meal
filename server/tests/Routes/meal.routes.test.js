import { chai, expect } from 'chai';
import request from 'supertest';
import chaiHttp from 'chai-http';
import app from '../../app';

// chai.expect();
// const { expect } = chai.expect;
// chai.use(chaiHttp);

describe('/POST book', () => {
  it('it should not POST a meal without the price field', (done) => {
    const meal = {
      title: 'Bread',
      description: 'Bread Bread',
      image: 'fgffh',
    };
    request(app)
      .post('/meals')
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        // expect(res).to.have.status(400);
        // if (err) return done(err);
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
    request(app)
      .post('/meals')
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

});