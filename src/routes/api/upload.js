var express = require('express');
var multer = require('multer');
var V = require('../../global');

var router = express.Router();
var upload = multer({ dest : V.varibales.uploadCache });

router.post('/single', upload.single('file'), function(req, res, next) {
    //console.dir(req.file);
    res.json({isSuccess : true});
});

router.post('/multi', function(req, res, next) {
    // res.json({isSuccess : true});
    res.sendStatus(404);
});

router.post('/append', function(req, res, next) {
    res.json({isSuccess : true});
});

module.exports = router;