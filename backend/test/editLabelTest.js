let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var assert = require('chai').assert;
var createNoteObject = require('../json/createNote');
console.log('label' +createNoteObject.editLabel[1]);
chai.use(chaiHttp);

describe('/EditLabel editLabel', () => {

    // it('Successfully edited label', (done) => {
    //         chai.request(server)
    //             .put('/label/' + createNoteObject.editLabel[0].labelId)
    //             .set('token', createNoteObject.loginToken[0].token)
    //             .send(createNoteObject.editLabel[1])
    //             .end((err, res) => {
    //                 console.log("response==>", res.body)
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('Object');
    //                 res.body.should.have.property('success').eql(true);
    //                 done();
    //             });
    //     })

    // it('Label Id cannot be null', (done) => {
    //         chai.request(server)
    //             .put('/label/' + createNoteObject.deleteLabel[1].labelId)
    //             .set('token', createNoteObject.loginToken[0].token)
    //             .end((err, res) => {
    //                 console.log("response==>", res.body)
    //                 res.should.have.status(400);
    //                 res.body.should.be.a('Object');
    //                 res.body.should.have.property('success').eql(false);
    //                 res.body.should.have.property('error').eql("Must be in the mongoose unique Id format");
    //                 done();
    //             });
    //     })

    // it('Token not sent', (done) => {
    //         chai.request(server)
    //             .put('/label/'+createNoteObject.editLabel[0].labelId)
    //             .send(createNoteObject.createNote[0])
    //             .end((err, res) => {
    //                 res.should.have.status(400);
    //                 console.log("body", res.error.text);
    //                 res.error.should.have.property('text').eql('Token not received');
    //                 done();
    //             });
    //     })

    // it('Token cannot be undefined', (done) => {
    //             chai.request(server)
    //                 .put('/label/'+createNoteObject.editLabel[0].labelId)
    //                 .end((err, res) => {
    //                     console.log("response==>",res.error.text)
    //                     res.should.have.status(400);
    //                     res.body.should.be.a('Object');
    //                     // let result = res.error.text;
    //                     //     assert.equal(result,'Token not received');
    //                     res.error.should.have.property('text').eql('Token not received')
    //                     done();
    //                 });
    //         })

    // it('Token cannot be empty', (done) => {
    //             chai.request(server)
    //                 .put('/label/'+createNoteObject.editLabel[0].labelId)
    //                 .set('token', createNoteObject.loginToken[2].token)
    //                 .end((err, res) => {
    //                     console.log("response==>",res.error.text)
    //                     res.should.have.status(400);
    //                     res.body.should.be.a('Object');
    //                     let result = res.error.text;
    //                         assert.equal(result,'Token not received');
    //                     done();
    //                 });
    //         })

    // it('Label Id not found', (done) => {
    //     chai.request(server)
    //         .put('/label/' + createNoteObject.editLabel[2].labelId)
    //         .set('token', createNoteObject.loginToken[0].token)
    //         .send(createNoteObject.editLabel[1])
    //         .end((err, res) => {
    //             console.log("response==>", res.body)
    //             res.should.have.status(404);
    //             res.body.should.be.a('Object');
    //             res.body.should.have.property('success').eql(false);
    //             res.body.should.have.property('message').eql('Label Id not found');
    //             done();
    //         });
    // })
    
})