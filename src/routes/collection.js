var express = require('express');
var dbo = require('../utils/utils').dbo;
var pager = require('../utils/utils').pager;
var V = require('../global').varibales;

var router = express.Router();

var findItem = function(list, condition){
  let item;
  for(let i =0; i< list.length; i++){
    if(condition(list[i])){
      item = list[i];
      list.splice(i, 1);
      break;
    }
  }
  return item;
};


var loadCollectionDatas = (id, page, url, callback) => {
  
  let sqlGetRecordsCount = 'SELECT COUNT(1) FROM sausage.v_collections_galleries WHERE parent = ?;';
  let getRecordsCountParas = [id];

  dbo.executeScalar(sqlGetRecordsCount, getRecordsCountParas, (err, result) => {
    if(err){
      callback(err);
    }else{
      let pagging = pager.pagging(result, V.pageSize, page);
      let sqlQueryCollection = 'SELECT id, name, cover, type, parent FROM sausage.v_collections_galleries WHERE parent = ? OR id = ? LIMIT ?, ?;';
      let queryCollectionPara = [id, id, pagging.startIndex, pagging.pageSize];

      dbo.executeQuery(sqlQueryCollection, queryCollectionPara, (err, result) => {
        if(err){
          callback(err);
        }else{
          let self = findItem(result, item => {
            return item.id == id;
          });

          let pageData = {
            currentPage : 'collection', 
            pager : pager.calculate(pagging.totalPages, 1, url),
            records : result,
            currentCollection : self
          };
            
          callback(null, pageData);
        }
      });
    }
  })
};

/* GET home page. */
router.get('/', function(req, res, next) {
  loadCollectionDatas(0, 1, '/collection/detail/0/',(err, pageData) => {
    if(err){
      res.sendStatus(500);
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
  loadCollectionDatas(req.id, req.page,`/collection/detail/${req.id}/`, (err, pageData) => {
    if(err){
      res.sendStatus(500);
    }else{
      res.render('collection/index', pageData);
    }
  });
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