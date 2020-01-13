let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var assert = require('chai').assert;
var createNoteObject = require('../json/createNote');
console.log("abc...." + JSON.stringify(createNoteObject.remainder[0]));
console.log("noteId...." + JSON.stringify(createNoteObject.noteId[6].addRemainderNoteId));

chai.use(chaiHttp);

describe('/remainder Remainder API', () => {
    // it('Successfully adding remainder', (done) => {
    //     chai.request(server)
    //         .put('/remainder/' + createNoteObject.noteId[6].addRemainderNoteId)
    //         .set('token', createNoteObject.loginToken[0].token)
    //         .send(createNoteObject.remainder[0])
    //         .end((err, res) => {
    //             console.log("response==>", res.body)
    //             res.should.have.status(200);
    //             res.body.should.be.a('Object');
    //             res.body.should.have.property('success').eql(true);
    //             res.body.should.have.property('message').eql('Successfully added remainder')
    //             done();
    //         });
    // })

    // it('Note Id cannot be null', (done) => {
    //     chai.request(server)
    //         .put('/remainder/' + createNoteObject.noteId[4].noteId)
    //         .set('token', createNoteObject.loginToken[0].token)
    //         .send(createNoteObject.remainder[0])
    //         .end((err, res) => {
    //             console.log("response==>", res.body.error)
    //             res.should.have.status(400);
    //             res.body.should.be.a('Object');
    //             res.body.should.have.property('success').eql(false);
    //             res.body.should.have.property('error').eql("Must be in the mongoose unique Id format");
    //             done();
    //         });
    // })

    // it('Note Id is required', (done) => {
    //     chai.request(server)
    //         .put('/remainder/' + createNoteObject.noteId[2].noteId)
    //         .set('token', createNoteObject.loginToken[0].token)
    //         .send(createNoteObject.remainder[0])
    //         .end((err, res) => {
    //             console.log("response==>", res.body)
    //             res.should.have.status(400);
    //             res.body.should.be.a('Object');
    //             res.body.should.have.property('success').eql(false);
    //             res.body.should.have.property('error').eql("Must be in the mongoose unique Id format");
    //             done();
    //         });
    // })

    // it('Token not sent', (done) => {
    //     chai.request(server)
    //         .put('/remainder/'+ createNoteObject.noteId[2].noteId)
    //         .send(createNoteObject.remainder[0])
    //         .end((err, res) => {
    //             res.should.have.status(400);
    //             console.log("body", res.error.text);
    //             let result = res.error.text;
    //             assert.equal(result, 'Token not received');
    //             res.body.should.be.a('Object');
    //             done();
    //         });
    // })

    // it('Token cannot be undefined', (done) => {
    //     chai.request(server)
    //         .put('/remainder/'+ createNoteObject.noteId[2].noteId)
    //         .send(createNoteObject.remainder[0])
    //         .end((err, res) => {
    //             console.log("response==>", res.error.text)
    //             res.should.have.status(400);
    //             res.body.should.be.a('Object');
    //             let result = res.error.text;
    //             assert.equal(result, 'Token not received');
    //             done();
    //         });
    // })

    // it('Token cannot be empty', (done) => {
    //     chai.request(server)
    //         .put('/remainder/'+ createNoteObject.noteId[2].noteId)
    //         .set('token', createNoteObject.loginToken[2].token)
    //         .send(createNoteObject.remainder[0])
    //         .end((err, res) => {
    //             console.log("response==>", res.error.text)
    //             res.should.have.status(400);
    //             res.body.should.be.a('Object');
    //             let result = res.error.text;
    //             assert.equal(result, 'Token not received');
    //             done();
    //         });
    // })

    // it('Remainder should be in valid date format', (done) => {
    //     chai.request(server)
    //         .put('/remainder/' + createNoteObject.noteId[6].addRemainderNoteId)
    //         .set('token', createNoteObject.loginToken[0].token)
    //         .send(createNoteObject.remainder[1])
    //         .end((err, res) => {
    //             console.log("response==>", res.body)
    //             res.should.have.status(400);
    //             res.body.should.be.a('Object');
    //             res.body.should.have.property('success').eql(false);
    //             res.body.should.have.property('error')
    //                 .eql('Must be in valid format [eg.(22-05-2013 11:23:22)]')
    //             done();
    //         });
    // })

    // it('Remainder should be in valid time format', (done) => {
    //     chai.request(server)
    //         .put('/remainder/' + createNoteObject.noteId[6].addRemainderNoteId)
    //         .set('token', createNoteObject.loginToken[0].token)
    //         .send(createNoteObject.remainder[2])
    //         .end((err, res) => {
    //             console.log("response==>", res.body)
    //             res.should.have.status(400);
    //             res.body.should.be.a('Object');
    //             res.body.should.have.property('success').eql(false);
    //             res.body.should.have.property('error')
    //                 .eql('Must be in valid format [eg.(22-05-2013 11:23:22)]')
    //             done();
    //         });
    // })
})