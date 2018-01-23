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
    
    let sqlGetRecordsCount = 'SELECT COUNT(1) FROM sausage.v_collections_galleries WHERE parent = ?;';
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
    })
  };

module.exports = collectionBiz;