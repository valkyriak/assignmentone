var app = require('../server.js')
let chai = require('chai');
let chaiHttp = require('chai-http');
const { assert } = require('console');
let should = chai.should();
chai.use(chaiHttp);


describe('Route testing for logins/auth', () => {
    it('it shhould authenticate a user', (done) => {
        chai.request(app).post('/api/auth').type('form').send({username: "sadmin", password: '123'})
        .end((err, rest) => {
            res.should.have.status(200);
            done();
        });
    });
});
describe('Route testing for getting groups for chat', () => {
    it('Should provide info for all groups', (done) => {
        chai.request(app)
            .get('api/getgroups')
            .end((err, res) => {
                res.should.have.status(200);
                done();
        });
    });
});
describe('Route testing for getting channels for chat', () => {
    it('Should provide info for all channels', (done) => {
        chai.request(app)
            .get('api/getchannels')
            .end((err, res) => {
                res.should.have.status(200);
                done();
        });
    });
});