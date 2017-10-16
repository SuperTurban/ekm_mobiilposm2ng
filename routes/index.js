var express = require('express');
var router = express.Router();

var Game = require('./../models/game.js');

/* GET home page. */
router.get('/test', function(req, res, next) {
  var g = new Game({name : "testname", description : "test"});
  g.save(function(err, docs){
    console.log(docs);
    console.log(err);
    return res.send('ok');
  });
  return;
});

router.get('/', function(req,res,next){
  Game.find(function(err, docs){
    return res.send(docs);
  })
});

module.exports = router;
