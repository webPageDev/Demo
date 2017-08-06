var multer = require('multer');
var fs = require('fs');
var path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploader/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({storage: storage}).array('userPhoto', 2);
opt={}

opt['all uploadfile'] = function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3200/uploadfile");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, accept, origin, content-type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
};
opt['get downloadfilerouter'] = function (req, res, next) {
    var filename = 'desktop.ini';
    var filepath = path.join(__dirname, '../../uploader/' + filename);
    var stats = fs.statSync(filepath);
    if (stats.isFile()) {
        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename=' + filename,
            "Content-Length": stats.size
        });
        fs.createReadStream(filepath).pipe(res);
    } else {
        res.end(404);
    }
};


opt['post uploadfileTest'] = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        (function iterator(index) {
            if(index === req.files.length) {
                return;
            }
            fs.stat('./', req.files[index].originalname,function (err, stats) {
                // do something
                console.log(index);
                iterator(index + 1);
            });
        })
        // for(let i=0; i<req.files.length;i++) {
        //     fs.stat('./', req.files[index].originalname,function (err, stats) {
        //         // do something
        //         console.log(index);
        //     });
        // }
        res.end("File is uploaded");
    });
};

module.exports = opt;
