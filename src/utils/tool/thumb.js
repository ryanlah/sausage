var gm = require("gm");
var fs = require("fs");
var V = require("../../global").image;

var core = V.core == "gm" ? gm : gm.subClass({ imageMagic : true});

var getSize = function(path, callback){
    core(path).size(callback);
};

function imageScale(){};

imageScale.prototype.getSize = function(path, callback){
    getSize(path, callback);
};

imageScale.prototype.resize = function(file, newfile, format, size, crop, quality, callback){
    let resizeProcess = core(file).resize(size.width, size.height, size.mode);
    if(crop != null){
        resizeProcess = resizeProcess.crop(crop.width, crop.height, crop.x, crop.y);
    }
    resizeProcess.setFormat(format)
        .quality(quality)
        .strip()
        .autoOrient()
        .write(newfile, err =>{
            if(err){
                callback(err);
            }else{
                callback(null, {
                    file : newfile, 
                    format : format,
                    size : crop == null ? size : {height : crop.height, width : crop.width},
                    quality : quality
                });
            }
        });
};

imageScale.prototype.getThumb = function(source, target, callback){
    getSize(source, (err, oSize) => {
        if(err){
            callback(err);
        }else{
            let crop = null;
            let newSize = {};

            if(oSize.height < V.thumb.height && oSize.width < V.thumb.width){
                newSize = {height : V.thumb.height, width : V.thumb.width, mode : "!"};
            }else{
                let scaleRate = (V.thumb.height * oSize.width)/ (oSize.height * V.thumb.width);
                let cropX = 0;
                let cropY = 0;
                if(scaleRate <= 1){
                    newSize.height = parseInt(oSize.height * V.thumb.width / oSize.width);
                    newSize.width = V.thumb.width;
                    cropY = parseInt((newSize.height - V.thumb.height)/2);
                }else{
                    newSize.height = V.thumb.height;
                    newSize.width = parseInt(oSize.width * V.thumb.height / oSize.height);
                    cropX = parseInt((newSize.width - V.thumb.width)/2);
                }
                crop = { width : V.thumb.width, height : V.thumb.height, x : cropX, y : cropY};
            }

            this.resize(source, target, V.format, newSize, crop, V.thumb.quality, (err, info) => {
                if(err){
                    callback(err);
                }else{
                    callback(null, info);
                }
            });
        }
    });
};

imageScale.prototype.getThumb2 = function(source, target, callback){
    getSize(source, (err, oSize) => {
        if(err){
            callback(err);
        }else{
            let crop = null;
            let newSize = {};

            if(oSize.height < V.thumb.height && oSize.width < V.thumb.width){
                newSize = {height : V.thumb.height, width : V.thumb.width, mode : "!"};
            }else{
                let scaleRate = (V.thumb.height * oSize.width)/ (oSize.height * V.thumb.width);

                if(scaleRate <= 1){
                    newSize.height = parseInt(oSize.height * V.thumb.width / oSize.width);
                    newSize.width = V.thumb.width;
                }else{
                    newSize.height = V.thumb.height;
                    newSize.width = parseInt(oSize.width * V.thumb.height / oSize.height);
                }
                crop = { width : V.thumb.width, height : V.thumb.height, x : 0, y : 0};
            }

            this.resize(source, target, V.format, newSize, crop, V.thumb.quality, (err, info) => {
                if(err){
                    callback(err);
                }else{
                    callback(null, info);
                }
            });
        }
    });
};

module.exports = imageScale;