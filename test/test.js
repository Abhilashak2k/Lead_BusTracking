var supertest = require('supertest');
const assert = require('assert');
const chaiHttp = require('chai-http');
const chai = require('chai');
var expect = chai.expect;
const mocha = require('mocha');
const app = require('../app');
global.request = supertest(app);

chai.use(chaiHttp);
const describe = mocha.describe

describe('POST tests on redis', function() {
        it('returns 404 because if trail exists', function(done) {
            request.post('/GetCurrentTrail')
                   .send({
                        route_id : 900
                    })
                    .expect(404)
                    .end(function(err, res) {
                        done(err);
                    });
        });

        it('doesn`t return 404 because stops exists', function(done) {
            request.post('/GetAllStops')
                .send({
                    route_id : 200
                })

                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done(err);
                });
        });

});

describe('post requests on DB', ()=>{
  it('should return empty array when invalid phone number', (done)=>{
    request.post('/UpdateParentRouteInfo')
           .send({PhNo : "109"})
           .end((err, res)=>{
             assert.equal(res.body.length, 0);
             done();
           })

  })

  it('should return non empty array when valid phone number', (done)=>{
    request.post('/UpdateParentRouteInfo')
           .send({PhNo : "1234567890"})
           .end((err, res)=>{
             assert.notEqual(res.body.length, 0);
             done();
           })

  })

})
