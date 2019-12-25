let mongoose    = require('mongoose');
let User        = require('../app/model/user');
let chai        = require('chai');
let chaiHttp    = require('chai-http');
let server      = require('../server');
// let should      = chai.should();
var assert      = require('chai').assert;
var forgotPasswordObject = require('./json/forgetPassword');
// console.log(forgotPasswordObject);
chai.use(chaiHttp);

describe('/POST forgotPassword', () => {
    it('it should not POST(forgotPassword) a user without details', (done) => {
       
      chai.request(server)
          .post('/forgotpassword')
          .send(forgotPasswordObject.forgotPassword[0])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('Object');
                res.body.should.have.property('success').eql(false)
            done();
          });
    });

    it('Email should be in email_id format', (done) => {
        chai.request(server)
            .post('/forgotpassword')
            .send(forgotPasswordObject.forgotPassword[1])
            .end((err, res) => {
                  console.log("res.body: ", res.body.error);
                      let result = res.body.error;
                      assert.equal(result,'Email must be in email format');
              done();
            });
    });

    it('Email should be in email_id format', (done) => {
        chai.request(server)
            .post('/forgotpassword')
            .send(forgotPasswordObject.forgotPassword[2])
            .end((err, res) => {
                  console.log("res.body: ", res.body.error);
                      let result = res.body.error;
                      assert.equal(result,'Email must be in email format');
              done();
            });
    });

    it('Email should be in email_id format', (done) => {
        chai.request(server)
            .post('/forgotpassword')
            .send(forgotPasswordObject.forgotPassword[3])
            .end((err, res) => {
                  console.log("res.body: ", res.body.error);
                      let result = res.body.error;
                      assert.equal(result,'Email must be in email format');
              done();
            });
    });

    it('Sending mail to the registered email_id', (done) => {
        chai.request(server)
            .post('/forgotpassword')
            .send(forgotPasswordObject.forgotPassword[4])
            .end((err, res) => {
                  console.log("RES.BODY: ", res.body);
                      let result = res.body.message;
                      assert.equal(result,'Mailsent');
              done();
            });
    });

    it('it should not POST(forgotPassword) a user without details', (done) => {
       
        chai.request(server)
            .post('/forgotpassword')
            .send(forgotPasswordObject.forgotPassword[4])
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
                  res.body.should.have.property('success').eql(true)
              done();
            });
      });

    //   it('Null request', (done) => {
    //     chai.request(server)
    //         .post('/forgotpassword')
    //         .send(forgotPasswordObject.forgotPassword[5])
    //         .end((err, res) => {
    //             console.log("json==",forgotPasswordObject.forgotPassword[5]);
                
    //               console.log("res.body: ", res.body.error);
    //                   let result = res.body.error;
    //                   assert.equal(result,'Request body cannot be null');
    //           done();
    //         });
    //     });
})