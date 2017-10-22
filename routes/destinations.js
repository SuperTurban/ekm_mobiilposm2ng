
var Destination = require('./../models/destination.js');
var Game = require('./../models/game.js')

const base_path = "/app/destination";

var authmdw = require('./../middleware/authenticate.js');
/*
LIST DESTINATIONS
/app/destination
*/
module.exports = function(app){

app.get(base_path, function(req, res, next) {
    let q = Destination.find(
           function(err, docs){
                res.send(docs);
                next(); 
            }
        )
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
app.post(base_path, authmdw.checkAdmin, function(req,res,next){

    let dest = new Destination(req.body.destination);

    dest.save(function(err){

        if(err){
            console.log(err);
            return;
        }

        return res.json({status : "ok", id : dest._id});
    });


});

app.get('/app/destination/:id', function(req,res,next){
    Destination.findOne(
        {_id: req.params.id},
        function(err, docs){
             res.send(docs);
             next(); 
         }
     )
});

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
app/desitination/:id
*/
app.put(base_path + '/:id' , function(req,res,next){
 
});
};

