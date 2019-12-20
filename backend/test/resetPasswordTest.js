let mongoose    = require('mongoose');
let User        = require('../app/model/user');
let chai        = require('chai');
let chaiHttp    = require('chai-http');
let server      = require('../server');
let should      = chai.should();
var assert      = require('chai').assert;
var resetPasswordObject = require('./json/resetPassword');
// console.log(resetPasswordObject);
chai.use(chaiHttp);

describe('/POST resetPassword', () => {
    it('it should not POST(resetPassword) a user without details', (done) => {
       
      chai.request(server)
          .post('/resetpassword')
          .set('token', resetPasswordObject.resetWithToken.token)
          .send(resetPasswordObject.resetPassword[0])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('Object');
                console.log("body :",res.body);
                res.body.should.have.property('success').eql(false)
                // res.body.should.have.property('title');
                // res.should.have.header('content-type', 'text/html; charset=utf-8')
            done();
          });
    });

    it('Password should contain 1 uppercase letter, 1 lowercase letter, a special character and number and minimum lenght should be 8 ', (done) => {
        chai.request(server)
            .post('/resetpassword')
            .set('token', resetPasswordObject.resetWithToken.token)
            .send(resetPasswordObject.resetPassword[1])
            .end((err, res) => {
                  console.log("res.body: ", res.body.error);
                      let result = res.body.error;
                      assert.equal(result,'Password must include one lowercase character, one uppercase character, a number, a special character and atleast 8 character long');
              done();
            });
    });

    it('Reset Successful', (done) => {
        chai.request(server)
            .post('/resetpassword')
            .set('token', resetPasswordObject.resetWithToken.token)
            .send(resetPasswordObject.resetPassword[3])
            .end((err, res) => {
                  console.log("Successful res.body: ", res.body);
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
                  res.body.data.should.have.property('isVerified');
                  res.body.data.should.have.property('email');
                  res.body.should.have.property('success').eql(true)
                  done();
            });
    });
})