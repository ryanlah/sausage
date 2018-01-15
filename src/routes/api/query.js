var express = require('express');
var multer = require('multer');
var util = require('../../utils/utils');

var router = express.Router();
var V = require('../global');
var fso = util.fso;

router.param('fileKey', function(req, res, next, fileKey){

});

router.get('/:fileKey', function(req, res, next) {
    res.json({isSuccess : true});
});

module.exports = router;