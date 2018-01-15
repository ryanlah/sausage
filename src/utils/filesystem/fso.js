var fs = require('fs');

function fso(){}

fso.prototype.readFileAsStream = function(fileName){
    let stream = fs.createReadStream(fileName);
};

fso.prototype.copySingle = function(originalFile, targetFile, deleteOriginal){
    deleteOriginal = deleteOriginal || true;  
};

fso.prototype.copyFlies = function(originalFiles, targetPath, deleteOriginal){
    deleteOriginal = deleteOriginal || true;
};

module.exports = fso;