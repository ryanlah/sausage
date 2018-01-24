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
                callback(null, {file});
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

            let oMaxLength = oSize.width > oSize.height ? oSize.width : oSize.height;
            let newMinLength = V.thumb.width > V.thumb.height ? V.thumb.width : V.thumb.height;

            let rate = (oSize.width * V.thumb.height)/(oSize.height * V.thumb.width);
            if(rate > 1){
                
            }else if(rate < 1){

            }else{

            }
            this.resize();
            callback(null, originalSize);
        }
    });

    // this.resize(source
    //     , target
    //     , V.format
    //     , V.thumb);
};

let scale = new imageScale();
// scale.resize("D:\\cache\\1.png", "D:\\cache\\scale.jpg", "JPEG", {width : 300, height: 300, mode : "!"}, {width: 163, height: 163, x : 68, y : 0}, 90, err =>{
//     if(err){
//         console.log(err);
//     }else{
        
//         getSize("D:\\cache\\scale.jpg", (err, size) => {
//             console.log(size);
//         });
//     }
// })

scale.resize("D:\\cache\\1.png", "D:\\cache\\scale.jpg", "JPEG", {width : 1200, height: 650, mode : "!"}, null, 100, err =>{
    if(err){
        console.log(err);
    }else{
        
        getSize("D:\\cache\\scale.jpg", (err, size) => {
            console.log(size);
        });
    }
})


// scale.getThumb("D:\\cache\\1.png", "", (err, size) => {
//     console.log(size);
// });
