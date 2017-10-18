
var Destination = require('./../models/destination.js');
var Game = require('./../models/game.js')

const base_path = "/app/destination";
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
app.post(base_path, function(req,res,next){

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

/*
MODIFY EXISTING DESTINATION
app/desitination/:id
*/
app.put(base_path + '/:id' , function(req,res,next){
 
});
};

