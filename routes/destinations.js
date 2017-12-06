
var Destination = require('./../models/destination.js');
var Game = require('./../models/game.js')

const base_path = "/app/destination";

const { check, body, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

var authmdw = require('./../middleware/authenticate.js');


let validationChain = 
[
    body('destination.name', 'Punktil peab olema nimi! (vähemalt 3 tähte)').isLength({min : 3}),
    body('destination.description', 'Punktil peab olema kirjeldus (vähemalt 10 tähte)').isLength({min : 10}),
    body('destination.coords.lat', 'Koordinaadid peavad määratud olema').isDecimal({force_decimal: true}),
];

let validationResultMW = function(req,res,next){
    if(!validationResult(req).isEmpty()){
         return res.status(422).json({status : 'failure', errors: validationResult(req).mapped()})
    }
    next();
}
/*
LIST DESTINATIONS
/app/destination
*/
module.exports = function(app){

app.get(base_path, function(req, res, next) {
    let q = Destination.find()
            .populate('media')
            .exec(
           function(err, docs){
                res.send(docs);
                next(); 
            }
        );
  });

/*
SINGLE DESTINATION BY ID
/app/destination/:id
*/


app.get(base_path + '/test', function(req,res,next){
     res.send('test');
})
/*
NEW DESTINATION
app/destination/
*/
app.post(base_path, authmdw.checkAdmin, 
    validationChain,
    validationResultMW,
    function(req,res,next){
        let dest = new Destination(req.body.destination);
        dest.save(function(err){
            if(err){
                return;
            }
            return res.json({status : "ok", id : dest._id});
        });
});


/**
 * 
 */
app.get('/app/destination/:id', function(req,res,next){
    Destination.findOne(
        {_id: req.params.id})
        .populate('media')
        .exec(
        function(err, docs){
             res.send(docs);
             next(); 
         }
        );
});


/**
 * DELETE DESTINATION 
 * POST /app/destination/:id/delete
 */
app.post('/app/destination/:id/delete', authmdw.checkAdmin, function(req,res){
    Destination.findByIdAndRemove(req.params.id, function(err, data){
        if(err)
            return console.log(err);
        else
            res.json({status : 'ok'});
    });
})

/*
MODIFY EXISTING DESTINATION
PUT app/destination/:id
*/

app.put(
    '/app/destination/:id',
    authmdw.checkAdmin, 
    validationChain,
    validationResultMW,
    function(req,res,next){
        let id = req.params.id;
        let dest = req.body.destination;

        Destination.findByIdAndUpdate(id, dest, function(err){
            if(err){
                return;
            }
            res.send({status : 'ok', id});
        });
});

};

