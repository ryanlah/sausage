var fs = require('fs');
var colors = require('colors');
var V = require('../../global').varibales;
var tool = require('../tool/tool');

var helper = new tool();
var NEW_LINE = V.newLine;

function logger(path, enableOutput){
    this.enableOutput = enableOutput || false;
    this.path = path;
};

logger.prototype.info = function(text){
    if(this.enableOutput){
        console.log('INF / ' + '200'.green + ' ' + text);
    }

    this.write(text, 'INFO');
}

logger.prototype.warn = function(text){
    if(this.enableOutput){
        console.log('WAR / ' + '500'.yellow + ' ' + text);
    }

    this.write(text, 'WARN');
}

logger.prototype.error = function(text){
    if(this.enableOutput){
        console.log('ERR / ' + '500'.red + ' ' + text);
    }

    this.write(text, 'ERROR');
}

logger.prototype.write = function(text, type){
    let file = `${V.logFile}\\${helper.getDate()}.log`;
    let msg = `${helper.getFullDate()} [${type}] ${text}${NEW_LINE}`;

    fs.appendFile(file, msg, (err) => {
        if(err){
            console.log('ERR / ' + '500'.red + ' ' + err.message);
        }
    });
};

logger.prototype.disposeWriter = function(){
    this.writer.close();
};

module.exports = logger;

