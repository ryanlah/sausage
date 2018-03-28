var express = require('express');
var multer = require('multer');
var V = require('../../global');
var scale = require('../../utils/utils').imgScale;
var dbo = require('../../utils/utils').dbo;

var router = express.Router();
var upload = multer({ dest : V.varibales.uploadCache });

router.post('/single', upload.single('file'), function(req, res, next) {
    res.json({isSuccess : true, info : req.file});
});

router.post('/thumb', upload.single('file'), function(req, res, next) {
    let sourceFile = req.file.path;
    let matcher = /[^\\]\w+$/g;
    let sourceFileName  = sourceFile.match(matcher)[0];
    let targetFile = V.varibales.coverFilePath + '\\' + sourceFileName;
    
    scale.getThumb2(sourceFile, targetFile, (err, data) => {
        if(err){
            res.json({isSuccess : false});
        }else{
            let sql = "INSERT INTO files (path) VALUES (?);";
            let para = [data.file];
            dbo.executeNonQuery(sql, para, (err, newId) => {
                if(err){
                    res.json({isSuccess : false});
                }else{
                    res.json({isSuccess : true, fileId : newId});
                }
            });
        }
    });
});

router.post('/multi', function(req, res, next) {
    // res.json({isSuccess : true});
    res.sendStatus(404);
});

router.post('/append', function(req, res, next) {
    res.json({isSuccess : true});
});

module.exports = router;