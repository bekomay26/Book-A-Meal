import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';

/* global it, describe */

describe('/RETRIEVE meals', () => {
  it('it should introduce you to the app ', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.text).to.equal('Book-A-Meal');
        done();
      });
  });
});
