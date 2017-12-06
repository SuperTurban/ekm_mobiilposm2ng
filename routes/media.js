const base_path = '/app/auth';

var Media = require('./../models/media.js');
var multer = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, './client/dist/media/')
   },

   filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
   }
});
  
const upload = multer({ storage: storage });

function getType(x){
    if(x.mimetype.match(/image/).length)
        return 'IMAGE';
    if(x.mimetype.match(/audio/).length)
        return 'AUDIO';
    
    return 'unefined';
}

module.exports = function(app){
    app.post('/app/media', upload.array("files[]",20), function(req,res){

        let files = req.files.map(x => {
            return {
                path      : x.filename,
                name      : x.originalname,
                mediaType : getType(x),
            }
        });


        Media.create(files, function(err, result){
            if(err)
                return res.json({status: 'failure', message : 'someting wong'});
            
            return res.json({status : 'ok', files : result})
        })
    });

    app.get('/app/media', function(req,res){
        Media.find(function(err, result){
            if(err)
                return res.json({status : 'failure'});

            return res.json({status : 'ok', files : result});
        });
    });
};

