var express = require('express');
var multer = require('multer');
var dbo = require('../../utils/utils').dbo;
var colBiz = require('../../biz/collections');
var V = require('../../global');

var router = express.Router();
var biz = new colBiz();

router.post('/collection/create', function(req, res, next) {
    let model = {name : req.body.name, parent : req.body.parent};
    biz.newCollectiion(model, (err, id) => {
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

router.param("id", function(req, res, next, id){
    req.body.id = id;
});

router.post('/collection/edit', function(req, res, next) {
    let model = {name : req.body.name, parent : req.body.parent, id : req.body.id};
    biz.updateCollection(model, (err, id) => {
        let result = {};
        if(err){
            result.isSuccess = false;
        }else{
            result.isSuccess = true;
            result.id = model.id;
        }
        res.json(result);
    });
});

router.post('/gallery/create', function(req, res, next) {
    
    res.json({isSuccess : true});
});

router.post('/gallery/edit', function(req, res, next) {
    //console.dir(req.file);
    res.json({isSuccess : true});
});

module.exports = router;