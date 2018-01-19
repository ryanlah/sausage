var express = require('express');
var page = require('../utils/tool/pager');
var router = express.Router();
var pager = new page();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('manage/index', { currentPage: 'manage' });
});

router.get('/collection', function(req, res, next) {
  let pageData = { 
    currentPage : 'manage',
    pager : pager.calculate(10, 4, "/manage/collection/detail/")
  };
  res.render('manage/collection', pageData);
});

router.param('collectionId', function(req, res, next, collectionId){
  req.id = collectionId;
  next();
});

router.get('/collection/create/:collectionId', function(req, res, next) {
  let data = '{"id" : "-1", "parent"  : "' + req.id +'", "name" : "' + 'Root' + '"}';
  let pageData = { 
    currentPage : 'manage',
    model : data
  };
  res.render('manage/collection-edit', pageData);
});

router.get('/collection/detail/:collectionId', function(req, res, next) {
  let pageData = { 
    currentPage : 'manage',
    collectionId : req.id
  };
  res.render('manage/collection-detail', pageData);
});

router.get('/collection/detail', function(req, res, next) {
  let pageData = { 
    currentPage : 'manage',
    collectionId : -1
  };
  res.render('manage/collection-detail', pageData);
});

module.exports = router;