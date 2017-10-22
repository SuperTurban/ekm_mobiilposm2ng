var express = require('express');
var router = express.Router();

var Game = require('./../models/game.js');
var Destination = require('./../models/destination.js');

var authmdw = require('./../middleware/authenticate.js');

module.exports = function(app){

    app.get('/app/game', function(req,res,next){
        console.log('test');
        Game.find(function(err, docs){
            return res.send(docs);
        })
    });

    app.post('/app/game', authmdw.checkAdmin, function(req,res,next){
        var game = new Game(req.body.game);

        var q = game.save(function(err){
            if(err){
                console.log(err);
                return;
            }
            res.send({status : 'ok', id : game._id});
        });
    });

    app.put('/app/game/:id', authmdw.checkAdmin, function(req,res){
        let id = req.params.id;
        let game = req.body.game;

        Game.findByIdAndUpdate(id, game,function(err){
            if(err){
                console.log(err);
                return;
            }

            res.send({status: 'ok', id : game._id});
        })
    });

    app.get('/app/game/:id', function(req,res){
        Game.findOne(
            {_id: req.params.id},
            function(err, docs){
                return docs;
            }
        )
        .then(function(docs){
            console.log('test');
            Destination.find({
                '_id' : {
                    $in : docs.destinations
                }
            },function(err, destinations){
                destinations = destinations.map(el => ({id : el._id, name :  el.name}));
                var r = {name : docs.name, _id : docs._id, description: docs.description, destinations : destinations};
                res.json(r);
            });
        })
    });

    app.post('/app/game/:id/delete', authmdw.checkAdmin, function(req,res){
        Game.findByIdAndRemove(req.params.id, function(err, data){
            if(err)
                return console.log(err);
            else
                res.json({status : 'ok'});
        });
    })

};
