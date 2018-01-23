var express = require('express');
var multer = require('multer');
var dbo = require('../../utils/utils').dbo;
var V = require('../../global');

var router = express.Router();

router.post('/collection/create', function(req, res, next) {
    var paras = [req.body.name, req.body.parent];

    dbo.executeNonQuery("INSERT INTO collections (name, parent) values (?, ?);", paras, 
        (err, id) => {
            let result = {};
            if(err){
                result.isSuccess = false;
            }else{
                result.isSuccess = true;
                result.id = id;
            }

            res.json(result);
        });
});

router.post('/collection/edit', function(req, res, next) {
    //console.dir(req.file);
    res.json({isSuccess : true});
});

router.post('/gallery/create', function(req, res, next) {
    //console.dir(req.file);
    res.json({isSuccess : true});
});

router.post('/gallery/edit', function(req, res, next) {
    //console.dir(req.file);
    res.json({isSuccess : true});
});

module.exports = router;