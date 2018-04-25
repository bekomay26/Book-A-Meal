import { chai, expect } from 'chai';
import request from 'supertest';
import chaiHttp from 'chai-http';
import app from '../../app';

// chai.expect();
// const { expect } = chai.expect;
// chai.use(chaiHttp);

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
      .post('/api/v1/meals')
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
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
      .put('/api/v1//meals/1114')
      .send(meal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        // expect(res).to.have.status(400);
        // if (err) return done(err);
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
        done();
      });
  });
});

describe('/DELETE meal', () => {
  it('it should not DELETE a meal that is not found', (done) => {
    request(app)
      .delete('/api/v1//meals/1114')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        // expect(res).to.have.status(400);
        // if (err) return done(err);
        done();
      });
  });
  it('it should DELETE a meal ', (done) => {
    request(app)
      .delete('/api/v1/meals/1111')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
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
        done();
      });
  });
});
