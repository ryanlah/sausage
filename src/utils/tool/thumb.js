var gm = require("gm");
var fs = require("fs");
var V = require("../../global").image;

var core = V.core == "gm" ? gm : gm.subClass({ imageMagic : true});

var getSize = function(path, callback){
    core(path).size(callback);
};

var getRandomFileName = function(path, callback){

};

function imageScale(){};

imageScale.prototype.getThumb = function(){};

imageScale.prototype.resize = function(path, size, quality, callback){
    core(path)
        .resize(size.width, size.height, ">")
        .setFormat(V.format)
        .quality(quality)
        .strip()
        .autoOrient()
        .write(path + '_thumb.jpg', err =>{
            if(err){
                callback(err);
            }else{
                callback();
            }
        });
};

imageScale.prototype.getSize = function(path, callback){
    getSize(path, callback);
};

let scale = new imageScale();
scale.resize("E:\\thumbs\\bg-43.jpg", {width : 400, height: 400}, 60, err =>{
    if(err){
        console.log(err);
    }
    console.log("Done");
})