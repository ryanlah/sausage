var mysql = require("mysql");
var config = require("../../global").mySql;
var dynObj = require("../tool/dynamicObject");

<<<<<<< HEAD
var dobj = new dynObj();

function dbo(){
    this.pool = mysql.createPool({
        connectionLimit : config.connectionLimit,
=======
function dbo(){
    this.pool = mysql.createPool({
        connectionLimit : 10,
>>>>>>> e0440018f4fafed3ef61f9deb8b431e34bd60177
        host : config.address,
        user : config.user,
        password : config.pass,
        port : config.port,
        database : config.schema
    });
};

<<<<<<< HEAD
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
=======
dbo.prototype.executeQuery = function(sql, callback){
    
};

dbo.prototype.handleNonQueryCallBack = function(sql, callback, err, result) {
    if(err){
        callback(err);
    }else{
        let output;
        switch(sql.substring(0, 6).toLowerCase()){
            case "insert":
                output = result.insertId;
                break;
            case "delete":
                output = result.affectedRows;
                break;
            case "update":
                output = result.changedRows; 
                break;
            default:
                output = null;
                break;
        }
        callback(null, output, result);
    }
};

dbo.prototype.executeNonQuery = function(sql, paras, callback){
    this.pool.getConnection((err, connection) => {
        if(err){
            callback(err);
        }else{
            switch(arguments.length){
                case 2:
                    connection.query(sql, (err, result)=>{
                        connection.release();
                        this.handleNonQueryCallBack(sql, callback, err, result);
                    });
                    break;
                case 3:
                    connection.query(sql, paras, (err, result)=>{
                        connection.release();
                        this.handleNonQueryCallBack(sql, callback, err, result);
                    });
                    break;
                default:
                    callback(new Exception("arguments are not recognized"));
            }

        }
    });
};

dbo.prototype.executeScalar = function(sql, callback){

};

>>>>>>> e0440018f4fafed3ef61f9deb8b431e34bd60177

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