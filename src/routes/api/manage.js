var express = require('express');
var multer = require('multer');
var dbo = require('../../utils/utils').dbo;
var V = require('../../global');

var router = express.Router();

router.post('/collection/create', function(req, res, next) {
    let sql = "INSERT INTO sausage.collections (parent, name) values (?, ?)"
    let paras = [req.body.parent, req.body.name];

    dbo.executeNonQuery(sql, paras, (err, id, result)=>{
        if(err){
            res.json({isSuccess : false});
        }else{
            res.json({isSuccess : true, newId : id});
        }
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