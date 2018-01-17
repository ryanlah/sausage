Vue.prototype.$http = axios;
Vue.prototype.showUploadDialog = function(){
    $("#fileUploader").trigger("click");
};
const MB = 1024 * 1024;
const UPLOAD_CONFIG = {
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: null
};

var app = new Vue({
    el : "#app",
    data : {
        filesToUpload : [],
        badUploadCount : 0,
        inUploadState : false,
        uploadMessage : "You are not upload anything yet."
    },
    methods : {
        selectFile : function($event){ 
            let files = $event.target.files;

            for(let i = 0; i < files.length; i++){
                let file = files[i];
                let fileInfo = {
                    id : 0,
                    file : file,
                    uploading : false,
                    progress : 0
                };
                this.filesToUpload.push(fileInfo);
            }
        },
        openFileDialog : function(){
            this.showUploadDialog();
        },
        deleteFile : function(fileIndex){
            this.filesToUpload.splice(fileIndex, 1);
        },
        uploadFiles : function(){
            this.inUploadState = true;
            let fileCount = 0;
            let that = this;
            this.filesToUpload.forEach(function(fileInfo) {
                that.uploadSingle(fileInfo, err => {
                    if(err){
                        fileInfo.progress = "failed";
                    }else{
                        that.deleteFile(fileInfo.id-1);
                    }
                    if(++fileCount == that.filesToUpload.length){
                        that.inUploadState = false;
                        that.uploadMessage = "Upload Successfully.";
                    }
                });
            }, this);
        },
        // uploadFilesSync : function(){
        //     let handleNext = () => {
        //         this.uploadFirst(handleNext);
        //     };
        //     this.uploadFirst(handleNext);
        // },
        // uploadFirst : function(callback){
        //     if(this.filesToUpload.length > this.badUploadCount){
        //         let fileInfo = this.filesToUpload[this.badUploadCount];
        //         this.uploadSingle(fileInfo, err => {
        //             if(err){
        //                 this.badUploadCount++;
        //                 fileInfo.progress = "failed";
        //                 console.log(err);
        //             }else{
        //                 this.deleteFile(this.badUploadCount);
        //             }
        //             callback();
        //         });
        //     }else{
        //         this.badUploadCount = 0;
        //         this.inUploadState = false;
        //         this.uploadMessage = "Upload Successfully.";
        //     }
        // },
        uploadSingle : function(fileInfo, callback){
            let formData = new FormData();
            formData.append('file', fileInfo.file);

            UPLOAD_CONFIG.onUploadProgress = progress => {
                fileInfo.uploading = true;
                fileInfo.progress = (progress.loaded * 100 / progress.total).toFixed(2) + "%";
            };

            this.$http.post("/api/upload/single", formData, UPLOAD_CONFIG)
            .then(res => {
                let err = res.status == 200 ? null : new DOMException(res.status);
                callback(err);
            })
            .catch(err => {
                callback(err);
            });
        },
        caculateSize : function(size){
            let result;
            if(size < MB){
                result = Math.round(size / 1024) + "KB";
            }else{
                result = (size / MB).toFixed(3) + "MB";
            }
            return result;
        }
    }
});