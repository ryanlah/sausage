var mysql = require("mysql");
var config = require("../../global").mySql;

function dbo(){
    this.pool = mysql.createPool({
        connectionLimit : 10,
        host : config.address,
        user : config.user,
        password : config.pass,
        port : config.port,
        database : config.schema
    });
}

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



module.exports = dbo;