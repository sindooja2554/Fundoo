let chai        = require('chai');
let chaiHttp    = require('chai-http');
let server      = require('../server');
let should      = chai.should();
var assert      = require('chai').assert;
var createNoteObject = require('../json/createNote');
chai.use(chaiHttp);

describe('/POST createNote', () => {
    it('Successfully created note', (done) => {
        chai.request(server)
            .post('/note/' + createNoteObject.noteId[0].noteId)
            .set('token', createNoteObject.loginToken[0].token)
            .send(createNoteObject.createNote[0])
            .end((err, res) => {
                console.log("response==>",res.body)
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.have.property('success').eql(true);
                done();
            });
    })

    it('Token not sent', (done) => {
        chai.request(server)
            .post('/note/' + createNoteObject.noteId[0].noteId)
            .send(createNoteObject.createNote[0])
            .end((err, res) => {
                res.should.have.status(400);
                console.log("body",res.error.text);
                let result = res.error.text;
                      assert.equal(result,'Token not received');
                // res.body.should.be.a('Object');
                // res.body.should.have.property('success').eql(true);
                done();
            });
    })
})