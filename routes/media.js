const base_path = '/app/auth';

var Media = require('./../models/media.js');
var multer = require('multer');
var cloudinary = require('cloudinary');

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

function uploadingDone(res){
    res.json({status:'ok'});
}
module.exports = function(app){
    app.post('/app/media', upload.array("files[]",20), function(req,res){

        let files = req.files.map(x => {
            return {
                path      : '/media/' + x.filename,
                name      : x.originalname,
                mediaType : getType(x),
            }
        });

        var totalItems = req.files.length;
        console.log(req.files.length);
        itemsDone = 0;

        if(process.env.CDN_STRATEGY == "CLOUD"){
          for(var index = 0; index < req.files.length; index++){
             cloudinary.v2.uploader.upload(req.files[index].path, 
                (function(ind){
                 return (function(error, result){
                    console.log(req.files);

                    if(error)
                        return console.log(error);
                    else
                        {
                            console.log(index);
                            console.log(req.files[ind]);
                            var m = new Media();
                            m.path = result.url;
                            m.name = req.files[ind].originalname;
                            m.mediaType = result.resource_type;
                            m.save(function(err, result){
                                if(err)
                                    return console.log(err);
                                else
                                {
                                    itemsDone++;
                                    if(totalItems == itemsDone)
                                        uploadingDone(res);
                                }
                            });
                        }
                });
             }(index)))
            }
        }
        else{

            Media.create(files, function(err, result){
                if(err)
                    return res.json({status: 'failure', message : 'some ting wong'});
                
                return res.json({status : 'ok', files : result})
            })
        }

    });

    app.get('/app/media', function(req,res){
        Media.find(function(err, result){
            if(err)
                return res.json({status : 'failure'});

            return res.json({status : 'ok', files : result});
        });
    });
};

