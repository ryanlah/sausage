var express = require('express');
var pager = require('../utils/utils').pager;
var colBiz = require('../biz/collections');
var rext = require('../utils/utils').rext;

var router = express.Router();
var biz = new colBiz();
var dataMaker = rext.getPageDataMaker('collection');

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
  let data = '{"id" : "-1", "parent"  : "' + req.id +'", "name" : ""}';
  let pageData = { 
    currentPage : 'manage',
    model : data
  };
  res.render('manage/collection-edit', pageData);
});

router.get('/collection/edit/:collectionId', function(req, res, next) {
  biz.getCollection(req.id, (err, current) => {
    let data = '{"id" : "' + current.id + '", "parent"  : "' + current.parent +'", "name" : "' + current.name + '"}';
    let pageData = { 
      currentPage : 'manage',
      model : data
    };
    res.render('manage/collection-edit', pageData);
  });
});

router.get('/collection/detail/:collectionId', function(req, res, next) {
  let pageData = { 
    currentPage : 'manage',
    collectionId : req.id
  };
  res.render('manage/collection-detail', pageData);
});

router.get('/collection/detail', function(req, res, next) {
  res.render('manage/collection-detail',  dataMaker.getPageData({
    collectionId : -1
  }));
});

module.exports = router;