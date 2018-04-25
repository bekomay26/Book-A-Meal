import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';

/* global it, describe */

describe('/RETRIEVE meals', () => {
  it('it should RETRIEVE all meals ', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.text).to.equal('Hello, world');
        done();
      });
  });
});
