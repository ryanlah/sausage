var pager = require('../utils/utils').pager;
var dbo = require('../utils/utils').dbo;
var V = require('../global').varibales;

function collectionBiz(){

};

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
  
  
collectionBiz.prototype.loadCollectionDatas = (id, page, url, callback) => { 
  let sqlGetRecordsCount = 'SELECT COUNT(1) AS total FROM sausage.v_collections_galleries WHERE parent = ?;';
  let getRecordsCountParas = [id];
  
  dbo.executeScalar(sqlGetRecordsCount, getRecordsCountParas, (err, result) => {
    if(err){
      callback(err);
    }else{
      let pagging = pager.pagging(result, V.pageSize, page);
      let sqlQueryCollection = 'SELECT id, name, cover, type, parent FROM sausage.v_collections_galleries WHERE id = ? UNION (SELECT id, name, cover, type, parent FROM sausage.v_collections_galleries WHERE parent = ? ORDER BY id DESC LIMIT ?, ?);';
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
            pager : pager.calculate(pagging.totalPages, pagging.index, url),
            records : result,
            currentCollection : self
          };
                
          callback(null, pageData);
        }
      });
    }
  });
};

collectionBiz.prototype.newCollectiion = (model, callback) => {
  let sql = "INSERT INTO collections (name, parent, cover) values (?, ?, ?);";
  let paras = [model.name, model.parent, model.cover];

  dbo.executeNonQuery(sql, paras, 
    (err, id) => {
      if(err){
        callback(err);
      }else{
        callback(null, id);
      }
    });
};

collectionBiz.prototype.updateCollection = (model, callback) => {
  let sql = "UPDATE collections SET name = ?, parent = ?, updated = CURRENT_TIMESTAMP WHERE id = ?);"
  let paras = [model.name, model.parent, model.id];

  dbo.executeNonQuery(sql, paras, 
    (err, effected) => {
      if(err){
        callback(err);
      }else{
        callback(null, effected);
      }
    });
};

collectionBiz.prototype.getCollection = (id, callback) => {
  let sql = "SELECT c.id, c.name, c.cover, c.created, c.updated FROM collections c WHERE c.id = ?;";
  let para = [id];

  dbo.executeQuery(sql, para,
    (err, data) => {
      if(err){
        callback(err);
      }else{
        let current = data.length == 0 ? null : data[0];
        callback(null, current);
      }
    }
  );
};

collectionBiz.prototype.getCollectionChilds = function(id, page, callback){
  let countSql = 'SELECT COUNT(1) AS total FROM v_collections_galleries WHERE parent = ?;';
  let countPara = [id];

  dbo.executeScalar(countSql, countPara, (err, result) => {
    
  });
}

module.exports = collectionBiz;