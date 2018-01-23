var mysql = require("mysql");
var config = require("../../global").mySql;
var dynObj = require("../tool/dynamicObject");

var dobj = new dynObj();

function dbo(){
    this.pool = mysql.createPool({
        connectionLimit : config.connectionLimit,
        host : config.address,
        user : config.user,
        password : config.pass,
        port : config.port,
        database : config.schema
    });
};

dbo.prototype.executeNonQuery = function(sql, paras, callback){
    this.execute(sql, paras, (err, result, fields) =>{
        if(err){
            callback(err);
        }else{
            let returnValue;
            let sqlType = sql.substring(0, 6).toLowerCase();
            switch(sqlType){
                case "insert":
                    returnValue = result.insertId;
                    break;
                case "update":
                    returnValue = result.changedRows;
                    break;
                case "delete":
                    returnValue = result.affectedRows;
                    break;
                default:
                    returnValue = null;
                    break;
            };
            callback(null, returnValue, {
                result :result,
                fields : fields
            });
        }
    });
};

dbo.prototype.executeQuery = function(sql, paras, callback){
    this.execute(sql, paras, (err, result, fields) =>{
        if(err){
            callback(err);
        }else{
            let returnObjs = [];
            if(result.length > 0 && fields.length > 0){
                for(let i =0; i< result.length; i++){
                    let props = [];
                    for(let j = 0; j< fields.length; j++){
                        props.push({
                            name : fields[j].name,
                            value : result[i][fields[j].name]
                        });
                    }
                    let obj = dobj.newObj(props);
                    returnObjs.push(obj);
                }
            }
            callback(null, returnObjs, {
                result : result,
                fields : fields
            });
        }
    });
};

dbo.prototype.executeScalar = function(sql, paras, callback){
    this.execute(sql, paras, (err, result, fields) =>{
        if(err){
            callback(err);
        }else{
            let returnValue = null;
            if(result.length > 0 && fields.length > 0){
                returnValue = result[0][fields[0].name];
            }
            callback(null, returnValue, {
                result : result,
                fields : fields
            });
        }
    });
};

dbo.prototype.execute = function(sql, paras, callback){
    this.pool.getConnection((err, connection)=>{
        if(err){
            callback(err);
        }else{
            connection.query(sql, paras, (err, result, fields)=>{
                connection.release();
                callback(err, result, fields);
            });
        }
    });
};

module.exports = dbo;