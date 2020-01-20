process.env.NODE_ENV = 'test';

const assert = require('assert');
var expect = require('chai').expect;
const mocha = require('mocha');
const dbquery = require('./data/dbquery');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('./app');
const describe = mocha.describe

describe('queryTest', ()=>{
  it('should create return status 200 on UpdateConductorRouteInfo post', (done)=>{
      chai.request(app).post('/UpdateConductorRouteInfo', {BusNo: 10,  Shift: "SA"}, (err, res)=>{
          res.should.have.status(200);
          //err.should.contain(" ");
         done();
      })

  })
})
