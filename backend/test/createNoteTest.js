let chai        = require('chai');
let chaiHttp    = require('chai-http');
let server      = require('../server');
let should      = chai.should();
var assert      = require('chai').assert;
var createNoteObject = require('../json/createNote');
chai.use(chaiHttp);

describe('/POST createNote', () => {
//     it('Successfully created note', (done) => {
//         chai.request(server)
//             .post('/note')
//             .set('token', createNoteObject.loginToken[0].token)
//             .send(createNoteObject.createNote[0])
//             .end((err, res) => {
//                 console.log("response==>",res.body)
//                 res.should.have.status(200);
//                 res.body.should.be.a('Object');
//                 res.body.should.have.property('success').eql(true);
//                 done();
//             });
//     })

    // it('Token not sent', (done) => {
    //     chai.request(server)
    //         .post('/note')
    //         .send(createNoteObject.createNote[0])
    //         .end((err, res) => {
    //             res.should.have.status(400);
    //             console.log("body",res.error.text);
    //             let result = res.error.text;
    //                   assert.equal(result,'Token not received');
    //             res.body.should.be.a('Object');
    //             // res.body.should.have.property('success').eql(false);
    //             done();
    //         });
    // })

    // it('Title cannot be empty', (done) => {
    //     chai.request(server)
    //         .post('/note')
    //         .set('token', createNoteObject.loginToken[0].token)
    //         .send(createNoteObject.createNote[1])
    //         .end((err, res) => {
    //             res.should.have.status(400);
    //             console.log("body",JSON.stringify(res.body.error[1].msg));
    //             let result = res.body.error[1].msg;
    //                   assert.equal(result,'title cannot be empty');
    //             res.body.should.be.a('Object');
    //             res.body.should.have.property('success').eql(false);
    //             done();
    //         });
    // })

//     it('Description cannot be empty', (done) => {
//         chai.request(server)
//             .post('/note')
//             .set('token', createNoteObject.loginToken[0].token)
//             .send(createNoteObject.createNote[2])
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 console.log("body",JSON.stringify(res.body.error[1].msg));
//                 let result = res.body.error[1].msg;
//                       assert.equal(result,'description cannot be empty');
//                 res.body.should.be.a('Object');
//                 res.body.should.have.property('success').eql(false);
//                 done();
//             });
//     })

    // it('Token cannot be undefined', (done) => {
    //     chai.request(server)
    //         .post('/note')
    //         .end((err, res) => {
    //             console.log("response==>",res.error)
    //             res.should.have.status(400);
    //             res.body.should.be.a('Object');
    //             let result = res.error.text;
    //                 assert.equal(result,'Token not received');
    //             done();
    //         });
    // })

    // it('Token cannot be empty', (done) => {
    //     chai.request(server)
    //         .post('/note')
    //         .set('token', createNoteObject.loginToken[2].token)
    //         .end((err, res) => {
    //             console.log("response==>",res.error.text)
    //             res.should.have.status(400);
    //             res.body.should.be.a('Object');
    //             let result = res.error.text;
    //                 assert.equal(result,'Token not received');
    //             done();
    //         });
    // })
})