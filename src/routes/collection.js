var express = require('express');
var page = require('../utils/tool/pager');
var router = express.Router();
var pager = new page();

/* GET home page. */
router.get('/', function(req, res, next) {
  let pageData = { 
    currentPage : 'collection',
    pager : pager.calculate(10, 1, "/collection/detail/")
  };
  res.render('collection/index', pageData);
});

router.get('/upload', function(req, res, next) {
  res.render('collection/upload', { currentPage: 'collection' });
});

router.get('/detail', function(req, res, next) {
  let pageData = { 
    currentPage : 'collection'
  };
  res.render('collection/detail', pageData);
});

module.exports = router;