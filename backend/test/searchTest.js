let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var assert = require('chai').assert;
var createNoteObject = require('../json/createNote');
console.log('/note/' + JSON.stringify(createNoteObject.createNote[0]));
console.log(createNoteObject.noteId[5].editId)
chai.use(chaiHttp);

describe('/Search', () => {
    it('Search complete', (done) => {
        chai.request(server)
            .post('/search')
            .set('token', createNoteObject.loginToken[0].token)
            .send(createNoteObject.search[0])
            .end((err, res) => {
                console.log("response==>", res.body)
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('message').eql('Data found')
                done();
            });
    })

    it('No result for search', (done) => {
        chai.request(server)
            .post('/search')
            .set('token', createNoteObject.loginToken[0].token)
            .send(createNoteObject.search[1])
            .end((err, res) => {
                console.log("response==>", res.body)
                res.should.have.status(404);
                res.body.should.be.a('Object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message').eql('Data not found')
                done();
            });
    })

    it('Cannot be undefined', (done) => {
        chai.request(server)
            .post('/search')
            .set('token', createNoteObject.loginToken[0].token)
            .end((err, res) => {
                console.log("response==>", res.body)
                res.should.have.status(400);
                res.body.should.be.a('Object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('error').eql('Search data cannot be null or undefined')
                done();
            });
    })

    it('Cannot be null', (done) => {
        chai.request(server)
            .post('/search')
            .set('token', createNoteObject.loginToken[0].token)
            .send(createNoteObject.search[2])
            .end((err, res) => {
                console.log("response==>", res.body)
                res.should.have.status(400);
                res.body.should.be.a('Object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('error').eql('Search data cannot be null or undefined')
                done();
            });
    })

    it('Cannot be empty', (done) => {
        chai.request(server)
            .post('/search')
            .set('token', createNoteObject.loginToken[0].token)
            .send(createNoteObject.search[3])
            .end((err, res) => {
                console.log("response==>", res.body)
                res.should.have.status(400);
                res.body.should.be.a('Object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('error').eql('Cannot be empty')
                done();
            });
    })

    it('Token not sent', (done) => {
        chai.request(server)
            .post('/search')
            .send(createNoteObject.search[0])
            .end((err, res) => {
                res.should.have.status(400);
                console.log("body", res.error.text);
                res.error.should.have.property('text').eql('Token not received');
                done();
            });
    })

    it('Token cannot be undefined', (done) => {
            chai.request(server)
                .post('/search')
                .end((err, res) => {
                    console.log("response==>",res.error.text)
                    res.should.have.status(400);
                    res.body.should.be.a('Object');
                    // let result = res.error.text;
                    //     assert.equal(result,'Token not received');
                    res.error.should.have.property('text').eql('Token not received')
                    done();
                });
        })

    it('Token cannot be empty', (done) => {
            chai.request(server)
                .post('/search')
                .set('token', createNoteObject.loginToken[2].token)
                .end((err, res) => {
                    console.log("response==>",res.error.text)
                    res.should.have.status(400);
                    res.body.should.be.a('Object');
                    let result = res.error.text;
                        assert.equal(result,'Token not received');
                    done();
                });
        })
})