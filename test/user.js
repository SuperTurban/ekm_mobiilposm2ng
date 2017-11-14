const expect = require('chai').expect;
const playerGames = require('./../models/playergames.js');
let chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

let server = 'localhost:3000';



describe('USER API, /app/user', () => {

    let user_id = 0;
    let game_id = 0;
    let destination_id = 0;

    before((done) => {
        chai.request(server)
            .post('/app/user/register')
            .send({email : 'test@test', username : 'test'})
            .end((err, res) => {
                user_id = res.body.uid;

                chai.request(server)
                    .get('/app/game')
                    .end((err, res) => {
                        game_id = res.body[0]._id;

                        chai.request(server)
                            .get('/app/destination')
                            .end((err, res) => {
                                user_id = res.body[0]._id;
                                done();
                            });
                    });
            });
    });

    describe('POST /app/user/:user_id/game/:game_id', () => {
        it('should insert player into a game', (done) => {
            chai.request(server)
                .post('/app/user/' + user_id + '/game/' + game_id)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('status').eql('ok');
                    done();
                });
        });
    });

    describe('GET /app/user/:user_id/game', () => {
        it('should respond with all playergames of given player', (done) => {
            chai.request(server)
                .get('/app/user/' + user_id + '/game')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.games).to.be.an('array');
                    done();
                });
        });
    });

    describe('POST /app/user/:user_id/game/:game_id/destination', () => {
        it('should add given destination to player game', done => {
            chai.request(server)
                .post('/app/user/' + user_id + '/game/' + game_id + '/destination')
                .send({destination_id, score : 2})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status').equal('ok');
                    done();
                });
        });
    });

    describe('GET /app/user/:user_id/game/:game_id/destination', () => {
        it('should respond with all given user given game completed destinations', (done) =>{
            chai.request(server)
                .get('/app/user/' + user_id + '/game/' + game_id + '/destination')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status').equal('ok');
                    expect(res.body).to.have.property('destinations');
                    expect(res.body.destinations.length).to.be.at.least(1);
                    done();
                });
        })
    });

});
