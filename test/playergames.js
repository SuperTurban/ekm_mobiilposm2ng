const expect = require('chai').expect;
const playerGames = require('./../models/playergames.js');

let PG = new playerGames({user_id : 2});
PG.user_id = 123;
PG.game_id = 321;
PG.destinations.push({score:2});
PG.destinations.push({score:1});
console.log(PG.destinations[0].destination_id);
describe("findPlayerGameScore", function(){
    it("finds the correct score", function(){
        expect(PG.findPlayerGameScore()).to.equal(3);
    });
})

describe("userHasDestination", function(){
    it("returns true when user has given destination", function(){
        expect(PG.userHasDestination(PG.destinations[0].destination_id)).to.be.true;
        expect(PG.userHasDestination(1)).to.be.true;
    });
    it("returns false when user doesn't have destination", function(){
        expect(PG.userHasDestination(0)).to.be.false;
        expect(PG.userHasDestination(3)).to.be.false;
    });
})