let chai        = require('chai');
let chaiHttp    = require('chai-http');
let server      = require('../server');
let should      = chai.should();
var assert      = require('chai').assert;
var createNoteObject = require('../json/createNote');
chai.use(chaiHttp);

describe('/GET getAllNotes', () => {
    // it('Successfully getting all notes', (done) => {
    //     chai.request(server)
    //         .get('/note')
    //         .set('token', createNoteObject.loginToken[0].token)
    //         .end((err, res) => {
    //             console.log("response==>",res.body)
    //             res.should.have.status(200);
    //             res.body.should.be.a('Object');
    //             res.body.should.have.property('success').eql(true);
    //             done();
    //         });
    // })
 
    // it('No note found', (done) => {
    //     chai.request(server)
    //         .get('/note')
    //         .set('token', createNoteObject.loginToken[1].token)
    //         .end((err, res) => {
    //             console.log("response==>",res.body)
    //             res.should.have.status(404);
    //             res.body.should.be.a('Object');
    //             res.body.should.have.property('success').eql(true);
    //             done();
    //         });
    // })

    // it('Token cannot be empty', (done) => {
    //     chai.request(server)
    //         .get('/note')
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

    // it('Token cannot be null', (done) => {
    //     chai.request(server)
    //         .get('/note')
    //         .set('token', createNoteObject.loginToken[3].token)
    //         .end((err, res) => {
    //             console.log("response==>",res.body)
    //             res.should.have.status(400);
    //             res.body.should.be.a('Object');
    //             res.body.should.have.property('message').eql('jwt malformed')
    //             // let result = res.error.text;
    //             //     assert.equal(result,'Token not received');
    //             done();
    //         });
    // })

    // it('Token cannot be undefined', (done) => {
    //     chai.request(server)
    //         .get('/note')
    //         .end((err, res) => {
    //             console.log("response==>",res.error.text)
    //             res.should.have.status(400);
    //             res.body.should.be.a('Object');
    //             let result = res.error.text;
    //                 assert.equal(result,'Token not received');
    //             done();
    //         });
    // })

    // it('Token not sent', (done) => {
    //             chai.request(server)
    //                 .get('/note')
    //                 .send(createNoteObject.createNote[0])
    //                 .end((err, res) => {
    //                     res.should.have.status(400);
    //                     console.log("body", res.error.text);
    //                     let result = res.error.text;
    //                     assert.equal(result, 'Token not received');
    //                     res.body.should.be.a('Object');
    //                     // res.body.should.have.property('success').eql(false);
    //                     done();
    //                 });
    //         })
        
})