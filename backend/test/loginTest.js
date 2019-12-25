let mongoose    = require('mongoose');
let User        = require('../app/model/user');
let chai        = require('chai');
let chaiHttp    = require('chai-http');
let server      = require('../server');
let should      = chai.should();
var assert      = require('chai').assert;
var loginObject = require('./json/login');
// console.log(loginObject);
chai.use(chaiHttp);

describe('/POST login', () => {
    it('it should not POST(login) a user without details', (done) => {
       
      chai.request(server)
          .post('/login')
          .send(loginObject.login[0])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('Object');
                res.body.should.have.property('success').eql(false)
            done();
          });
    });

    it('Email should be in email_id format', (done) => {
        chai.request(server)
            .post('/login')
            .send(loginObject.login[1])
            .end((err, res) => {
                  console.log("res.body: ", res.body.error);
                      let result = res.body.error;
                      assert.equal(result,'Email must be in email format');
              done();
            });
    });

    it('Email should be in email_id format', (done) => {
        chai.request(server)
            .post('/login')
            .send(loginObject.login[2])
            .end((err, res) => {
                  console.log("res.body: ", res.body.error);
                      let result = res.body.error;
                      assert.equal(result,'Email must be in email format');
              done();
            });
    });

    it('Email should be in email_id format', (done) => {
        chai.request(server)
            .post('/login')
            .send(loginObject.login[3])
            .end((err, res) => {
                  console.log("res.body: ", res.body.error);
                      let result = res.body.error;
                      assert.equal(result,'Email must be in email format');
              done();
            });
    });

    it('Password should contain 1 uppercase letter, 1 lowercase letter, a special character and number and minimum lenght should be 8 ', (done) => {
        chai.request(server)
            .post('/login')
            .send(loginObject.login[4])
            .end((err, res) => {
                  console.log("res.body: ", res.body.error);
                      let result = res.body.error;
                      assert.equal(result,'Password must include one lowercase character, one uppercase character, a number, a special character and atleast 8 character long');
              done();
            });
    });

    it('Password should contain 1 uppercase letter, 1 lowercase letter, a special character and number and minimum lenght should be 8 ', (done) => {
        chai.request(server)
            .post('/login')
            .send(loginObject.login[5])
            .end((err, res) => {
                  console.log("res.body: ", res.body.error);
                      let result = res.body.error;
                      assert.equal(result,'Password must include one lowercase character, one uppercase character, a number, a special character and atleast 8 character long');
              done();
            });
    });

    it('Password should contain 1 uppercase letter, 1 lowercase letter, a special character and number and minimum lenght should be 8 ', (done) => {
        chai.request(server)
            .post('/login')
            .send(loginObject.login[6])
            .end((err, res) => {
                  console.log("res.body: ", res.body.error);
                      let result = res.body.error;
                      assert.equal(result,'Password must include one lowercase character, one uppercase character, a number, a special character and atleast 8 character long');
              done();
            });
    });

    it('Verified', (done) => {
        chai.request(server)
            .post('/login')
            .send(loginObject.login[7])
            .end((err, res) => {
                  console.log("res.body: ", res.body.message);
                      let result = res.body.message;
                      assert.equal(result,'Please verify your email to login');
              done();
            });
    });

    it('Password did not match', (done) => {
        chai.request(server)
            .post('/login')
            .send(loginObject.login[8])
            .end((err, res) => {
                  console.log("res.body: ", res.body.message);
                      let result = res.body.message;
                      assert.equal(result,'Password did not match');
              done();
            });
    });

    it('Successful Login', (done) => {
        chai.request(server)
            .post('/login')
            .send(loginObject.login[9])
            .end((err, res) => {
                  console.log("res.body: ", res.body);
                      let result = res.body.message;
                      assert.equal(result,'Login successful');
                      res.body.should.have.property('token');
                      res.body.data.data.should.have.property('email');
                      res.body.data.data.should.have.property('password');
                      res.body.should.have.property('success').eql(true)
              done();
            });
    });

    it('it should not POST(login) a user without details', (done) => {
       
        chai.request(server)
            .post('/login')
            .send(loginObject.login[9])
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
              done();
            });
      });

    //   it('Null request', (done) => {
    //     chai.request(server)
    //         .post('/login')
    //         .send(loginObject.login[10])
    //         .end((err, res) => {
    //             console.log("json==",loginObject.login[10]);
                
    //               console.log("res.body: ", res.body.error);
    //                   let result = res.body.error;
    //                   assert.equal(result,'Request body cannot be null');
    //           done();
    //         });
    // });
})