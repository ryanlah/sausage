var mysql = require("mysql");
var config = require("../../global").mySql;

function dbo(){
    this.connection = null;
}


dbo.prototype.createConnection = function(){
    this.connection = mysql.createConnection({
        host : config.address,
        user : config.user,
        password : config.pass,
        port : config.port,
        database : config.schema
    });
}



module.exports = dbo;