var express = require('express');
var router = express.Router();

var Game = require('./../models/game.js');

module.exports = function(app){

    app.get('/app/game', function(req,res,next){
        Game.find(function(err, docs){
            return res.send(docs);
            next();
        })
    });

    app.get('/app/game/test', function(req,res,next){
        res.send('test');
    });

    app.post('/app/game', function(req,res,next){
        console.log(req.body.game);
        var game = new Game(req.body.game);

        var q = game.save(function(err){
            if(err){
                console.log(err);
                return;
            }
            res.send({status : 'ok', id : game._id});
        });
    });

    app.get('/app/game/:id', function(req,res,next){
        Game.findOne(
            {_id: req.params.id},
            function(err, docs){
                res.send(docs);
                next(); 
            }
        )
    });

};
