import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';

/* global it, describe */

describe('/RETRIEVE', () => {
  it('it should get default error page ', (done) => {
    request(app)
      .get('/gf')
      .end((err, res) => {
        expect(res.text).to.equal('Page not found');
        done();
      });
  });
});
describe('/POST', () => {
  it('it should get default error page ', (done) => {
    request(app)
      .post('/gf')
      .end((err, res) => {
        expect(res.text).to.equal('Page not found');
        done();
      });
  });
});
describe('/PUT', () => {
  it('it should get default error page ', (done) => {
    request(app)
      .put('/gf')
      .end((err, res) => {
        expect(res.text).to.equal('Page not found');
        done();
      });
  });
});
describe('/DELETE', () => {
  it('it should get default error page ', (done) => {
    request(app)
      .delete('/gf')
      .end((err, res) => {
        expect(res.text).to.equal('Page not found');
        done();
      });
  });
});
