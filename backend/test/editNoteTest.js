let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var assert = require('chai').assert;
var createNoteObject = require('../json/createNote');
console.log('/note/' +JSON.stringify(createNoteObject.createNote[0]));
console.log( createNoteObject.noteId[5].editId)
chai.use(chaiHttp);

describe('/EditNote editNote', () => {

    // it('Successfully edited note', (done) => {
    //         chai.request(server)
    //             .put('/note/' + createNoteObject.noteId[5].editId)
    //             .set('token', createNoteObject.loginToken[0].token)
    //             .send(createNoteObject.createNote[0])
    //             .end((err, res) => {
    //                 console.log("response==>", res.body)
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('Object');
    //                 res.body.should.have.property('success').eql(true);
    //                 res.body.should.have.property('message').eql('Update Successfully')
    //                 done();
    //             });
    //     })

    // it('Note Id cannot be null', (done) => {
    //     chai.request(server)
    //         .put('/note/' + createNoteObject.noteId[4].noteId)
    //         .set('token', createNoteObject.loginToken[0].token)
    //         .end((err, res) => {
    //             console.log("response==>", res.body.error)
    //             res.should.have.status(400);
    //             res.body.should.be.a('Object');
    //             res.body.should.have.property('success').eql(false);
    //             let result = res.body.error;
    //             assert.equal(result,'Cannot be undefined');
    //             done();
    //         });
    // })

    // it('Token not sent', (done) => {
    //     chai.request(server)
    //         .put('/note/'+createNoteObject.noteId[5].editId)
    //         .send(createNoteObject.createNote[0])
    //         .end((err, res) => {
    //             res.should.have.status(400);
    //             console.log("body", res.error.text);
    //             res.error.should.have.property('text').eql('Token not received');
    //             done();
    //         });
    // })

    // it('Token cannot be undefined', (done) => {
    //         chai.request(server)
    //             .put('/note/'+createNoteObject.noteId[5].editId)
    //             .end((err, res) => {
    //                 console.log("response==>",res.error.text)
    //                 res.should.have.status(400);
    //                 res.body.should.be.a('Object');
    //                 // let result = res.error.text;
    //                 //     assert.equal(result,'Token not received');
    //                 res.error.should.have.property('text').eql('Token not received')
    //                 done();
    //             });
    //     })

    // it('Token cannot be empty', (done) => {
    //         chai.request(server)
    //             .put('/note/'+createNoteObject.noteId[5].editId)
    //             .set('token', createNoteObject.loginToken[2].token)
    //             .end((err, res) => {
    //                 console.log("response==>",res.error.text)
    //                 res.should.have.status(400);
    //                 res.body.should.be.a('Object');
    //                 let result = res.error.text;
    //                     assert.equal(result,'Token not received');
    //                 done();
    //             });
    //     })

    //     it('Cannot be undefined', (done) => {
    //         chai.request(server)
    //             .put('/note/' + createNoteObject.noteId[5].editId)
    //             .set('token', createNoteObject.loginToken[0].token)
    //             .send(createNoteObject.createNote[3])
    //             .end((err, res) => {
    //                 console.log("response==>", res.body)
    //                 res.should.have.status(400);
    //                 res.body.should.be.a('Object');
    //                 res.body.should.have.property('success').eql(false);
    //                 res.body.should.have.property('error').eql('Cannot be undefined')
    //                 res.body.should.have.property('message').eql('Some error');
    //                 done();
    //             });
    //     })

    //     it('Cannot be null', (done) => {
    //         chai.request(server)
    //             .put('/note/' + createNoteObject.noteId[5].editId)
    //             .set('token', createNoteObject.loginToken[0].token)
    //             .send(createNoteObject.createNote[4])
    //             .end((err, res) => {
    //                 console.log("response==>", res.body)
    //                 res.should.have.status(400);
    //                 res.body.should.be.a('Object');
    //                 res.body.should.have.property('success').eql(false);
    //                 res.body.should.have.property('error').eql('Cannot be null')
    //                 res.body.should.have.property('message').eql('Some error');
    //                 done();
    //             });
    //     })

    //     it('Please send all the field in request',(done) => {
    //         chai.request(server)
    //             .put('/note/'+ createNoteObject.noteId[5].editId)
    //             .set('token', createNoteObject.loginToken[0].token)
    //             .send(createNoteObject.createNote[5])
    //             .end((err, res) => {
    //                 console.log("response==>", res.body)
    //                 res.should.have.status(400);
    //                 res.body.should.be.a('Object');
    //                 res.body.should.have.property('success').eql(false);
    //                 res.body.should.have.property('error').eql('Please add all the fields')
    //                 res.body.should.have.property('message').eql('Please add all the fields');
    //                 done();
    //             });
    //     } )

})