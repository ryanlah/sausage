var express = require('express');
var multer = require('multer');
var V = require('../../global');

var router = express.Router();
var upload = multer({ dest : V.varibales.uploadCache });

router.post('/collection/create', function(req, res, next) {
    //console.dir(req.file);
    res.json({isSuccess : true});
});

router.post('/collection/edit', function(req, res, next) {
    //console.dir(req.file);
    res.json({isSuccess : true});
});

router.post('/gallery/create', upload.single('file'), function(req, res, next) {
    //console.dir(req.file);
    res.json({isSuccess : true});
});

router.post('/gallery/edit', upload.single('file'), function(req, res, next) {
    //console.dir(req.file);
    res.json({isSuccess : true});
});

module.exports = router;