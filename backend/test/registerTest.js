let mongoose = require('mongoose');
let User     = require('../app/model/user');
let chai     = require('chai');
let chaiHttp = require('chai-http');
let server   = require('../server');
let should   = chai.should();
var assert = require('chai').assert;
var registrationObject = require('./json/register');
// console.log(registrationObject.register[1])
chai.use(chaiHttp);

/*
 * Test the /POST route
*/
describe('/POST registration', () => {
    it('it should not POST(register) a user without details', (done) => {
       
      chai.request(server)
          .post('/register')
          .send(registrationObject.register[0])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('Object');
            done();
          });
    });

    it('First Name should be character string only', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[0])
            .end((err, res) => {
                //   console.log("res.body= ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'First Name must be character string only');

              done();
            });
    });

    it('First name should be atleast 3 character long', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[1])
            .end((err, res) => {
                //   console.log("res.body: ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'First name must be 3 character long');

              done();
            });
    });

    it('First Name should be character string only', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[2])
            .end((err, res) => {
                //   console.log("res.body: ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'First Name must be character string only');
              done();
            });
    });

    it('Last Name should be character string only', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[3])
            .end((err, res) => {
                //   console.log("res.body: ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'Last Name must be character string only');
              done();
            });
    });

    it('Last name should be atleast 3 character long', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[4])
            .end((err, res) => {
                //   console.log("res.body: ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'Last name must be 3 character long');
              done();
            });
    });

    it('Last Name should be character string only', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[5])
            .end((err, res) => {
                //   console.log("res.body: ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'Last Name must be character string only');
              done();
            });
    });

    it('Email should be in email_id format', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[6])
            .end((err, res) => {
                //   console.log("res.body: ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'Email must be in email format');
              done();
            });
    });

    it('Email should be in email_id format', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[7])
            .end((err, res) => {
                //   console.log("res.body: ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'Email must be in email format');
              done();
            });
    });

    it('Password should contain 1 uppercase letter, 1 lowercase letter, a special character and number and minimum lenght should be 8 ', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[8])
            .end((err, res) => {
                //   console.log("res.body: ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'Password must include one lowercase character, one uppercase character, a number, a special character and atleast 8 character long');
              done();
            });
    });

    it('Password should contain 1 uppercase letter, 1 lowercase letter, a special character and number and minimum lenght should be 8 ', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[9])
            .end((err, res) => {
                //   console.log("res.body: ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'Password must include one lowercase character, one uppercase character, a number, a special character and atleast 8 character long');
              done();
            });
    });

    it('Password should contain 1 uppercase letter, 1 lowercase letter, a special character and number and minimum lenght should be 8 ', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[10])
            .end((err, res) => {
                // console.log("json==",registrationObject.register[10]);
                
                //   console.log("res.body: ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'Password must include one lowercase character, one uppercase character, a number, a special character and atleast 8 character long');
              done();
            });
    });

    it('Password should contain 1 uppercase letter, 1 lowercase letter, a special character and number and minimum lenght should be 8 ', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[11])
            .end((err, res) => {
                // console.log("json==",registrationObject.register[11]);
                
                 // console.log("res.body: ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'Password must include one lowercase character, one uppercase character, a number, a special character and atleast 8 character long');
              done();
            });
    });

    it('First Name cannot be empty', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[12])
            .end((err, res) => {
                // console.log("json==",registrationObject.register[12]);
                
                //   console.log("res.body: ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'First name must be 3 character long');
              done();
            });
    });

    it('Last Name cannot be empty', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[13])
            .end((err, res) => {
                // console.log("json==",registrationObject.register[13]);
                
                //   console.log("res.body: ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'Last name must be 3 character long');
              done();
            });
    });

    it('Email cannot be empty', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[14])
            .end((err, res) => {
                // console.log("json==",registrationObject.register[14]);
                
                //   console.log("res.body: ", res.body.error[0].msg);
                      let result = res.body.error[0].msg;
                      assert.equal(result,'Email must be in email format');
              done();
            });
    });

    // it('Already registered', (done) => {
    //     chai.request(server)
    //         .post('/register')
    //         .send(registrationObject.register[15])
    //         .end((err, res) => {
    //             console.log("json==",registrationObject.register[15]);
                
    //               console.log("res.body: ", res.body.message);
    //                   let result = res.body.message;
    //                   assert.equal(result,'Already registered');
    //           done();
    //         });
    // });

    it('Registration successfull', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[17])
            .end((err, res) => {
                console.log("json==",registrationObject.register[16]);
                
                  console.log("res.body: ", res.body.message);
                      let result = res.body.message;
                      assert.equal(result,'Successfully registered');
              done();
            });
    });

    it('Null request', (done) => {
        chai.request(server)
            .post('/register')
            .send(registrationObject.register[18])
            .end((err, res) => {
                console.log("json==",registrationObject.register[18]);
                
                  console.log("res.body: ", res.body.error);
                      let result = res.body.error;
                      assert.equal(result,'Request body cannot be null');
              done();
            });
    });
});
