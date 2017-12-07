var express = require('express');
var router = express.Router();

var Game = require('./../models/game.js');
var Destination = require('./../models/destination.js');

const { check, body, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

var authmdw = require('./../middleware/authenticate.js');

module.exports = function(app){
    app.get('/app/game/example', (req, res) => {
        Game.aggregate(
            {
                $unwind : "$destinations"
            },
            {
                $lookup : {
                    from:"destinations",
                    localField: "destinations",
                    foreignField: "_id",
                    as: "destination"
                }
            },
            {
                $group : {
                    _id : "$name",
                    count : {$sum : 1},
                }
            },
            function(err, response){
                if(err)
                    console.log(err);
                else
                    return res.json(response);
            }
        );
    });
    app.get('/app/game', function(req,res,next){
        console.log('test');
        Game.find(function(err, docs){
            return res.send(docs);
        })
    });

    app.post(
        '/app/game', 
        authmdw.checkAdmin, 
        body('game.name', ' peab olema nimi (vähemalt 3 tähte)!').isLength({min : 3}),
        function(req,res,next){

            if(!validationResult(req).isEmpty()){
                return res.status(422).json({errors: validationResult(req).mapped()})
            }

            var game = new Game(req.body.game);

            var q = game.save(function(err){
                if(err){
                    return;
                }
                res.send({status : 'ok', id : game._id});
            });
        });

    app.put(
        '/app/game/:id', 
        authmdw.checkAdmin, 
        body('game.name', ' peab olema nimi (vähemalt 3 tähte)!').isLength({min : 3}),
        function(req,res,next){

            if(!validationResult(req).isEmpty()){
                return res.status(422).json({errors: validationResult(req).mapped()})
            }

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
            Destination.find({
                '_id' : {
                    $in : docs.destinations
                }
            },function(err, destinations){
                destinations = destinations.map(el => ({id : el._id, name :  el.name}));
                var r = {active: docs.active, name : docs.name, _id : docs._id, description: docs.description, destinations : destinations};
                res.json(r);
            });
        })
    });

    app.get('/app/game/:id/destinations', function(req,res){
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
                var r = {status : 'ok', destinations : destinations};
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
