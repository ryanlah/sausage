var express = require('express');
var cobiz = require('../biz/collections');
var rext = require('../utils/utils').rext;
var logger = require('../utils/utils').logger;

var router = express.Router();
var biz = new cobiz();

/* GET home page. */
router.get('/', function(req, res, next) {
  biz.loadCollectionDatas(0, 1, '/collection/detail/0/',(err, pageData) => {
    if(err){
      logger.error(err.message);
      rext.send500(next);
    }else{
      res.render('collection/index', pageData);
    }
  });
});

router.param("id", function(req, res, next, id){
  req.id = id;
  next();
});

router.param("page", function(req, res, next, page){
  req.page = page;
  next();
});

router.get('/detail/:id/:page', function(req, res, next) {
  biz.loadCollectionDatas(req.id, req.page,`/collection/detail/${req.id}/`, (err, pageData) => {
    if(err){
      rext.send500(next);
    }else{
      res.render('collection/index', pageData);
    }
  });
});

router.get('/gallery/:id/', function(req, res, next) {
  // loadCollectionDatas(req.id, req.page,`/collection/detail/${req.id}/`, (err, pageData) => {
  //   if(err){
  //     res.sendStatus(500);
  //   }else{
  //     res.render('collection/index', pageData);
  //   }
  // });
  rext.send500(next);
});

// router.get('/upload', function(req, res, next) {
//   res.render('collection/upload', { currentPage: 'collection' });
// });

// router.get('/detail', function(req, res, next) {
//   let pageData = { 
//     currentPage : 'collection'
//   };
//   res.render('collection/detail', pageData);
// });

module.exports = router;