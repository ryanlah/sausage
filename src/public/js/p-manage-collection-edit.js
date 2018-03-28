const UPLOAD_CONFIG = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};

let originalData = JSON.parse($("#originalData").val());
Vue.prototype.showCoverDialog = () => {$("#uploadCoverFile").trigger("click")};
Vue.prototype.$http = axios;
Vue.prototype.redirect = (url) => {window.location.href=url;};

var app = new Vue({
    el : "#app",
    data : {
        model : {
            name : originalData.name,
            parent : originalData.parent,
            cover : originalData.cover == "" ? "/img/cover-bg.jpg" : originalData.cover,
        },
        result : {
            alertType : "",
            showResult : false,
            title : "",
            message : "",
            showLink : true,
            url : ""
        },
        original : originalData,
        preview : "/img/cover-bg.jpg",
        nameHasError : false,
        coverFile : null
    },
    methods : {
        cancel : function(){
            let url = "/manage/collection";
            this.redirect(url);
        },
        setCover : function(){
            this.showCoverDialog();
        },
        setCoverFile : function(event){
            let coverFile = event.target.files[0];
            this.coverFile = coverFile;
            this.preview = window.URL.createObjectURL(coverFile);
        },
        validate : function(){
            let isValid = true;
            if(this.model.name.trim() == ""){
                isValid = false;
                this.nameHasError = true;
            }else{
                this.nameHasError = false;
            }
            return isValid;
        },
        submit : function(){
            if(this.validate()){
                this.uploadCover((err, res) => {
                    if(err){
                        callback(err);
                    }else{
                        let json = this.generateJson();
                        let url = this.fetchUrl();

                        this.postData(url, json, (err, data) => {
                            this.result.showResult = true;
                            if(err == null && data.isSuccess){
                                this.result.alertType = "alert-success";
                                this.result.title = "Success";
                                this.result.message = "create new collection successfully, ";
                                this.result.showLink = true;
                                this.result.url = "/manage/collction/detail/" + data.id;
                            }else{
                                this.result.title = "Fail";
                                this.result.message = "failed to create a new collection.";
                                this.result.alertType = "alert-danger";
                                this.result.showLink = false;
                            }
                        });
                    }
                });
            }
        },
        postData : function(url, json, callback){
            this.$http.post(url, json)
                .then(res => {
                    let err = res.status == 200 ? null : new Exception(res.status);
                    callback(err, res.data);
                })
                .catch(err => {
                    callback(err);
                });
        },
        generateJson : function(){
            let json = {};

            json.parent = this.original.parent;
            json.name = this.model.name;
            json.cover = this.model.cover;

            if(this.original.id > 0){
                json.id = this.original.id; 
            }

            return json;
        },
        fetchUrl : function(){
            let mode = this.original.id > 0 ? "edit" : "create";
            return `/api/manage/collection/${mode}`;
        },
        uploadCover : function(callback){
            let formData = new FormData();
            formData.append('file', this.coverFile);

            this.$http.post("/api/upload/thumb", formData, UPLOAD_CONFIG)
                .then(res => {
                    let err = res.status == 200 ? null : new DOMException(res.status);
                    this.model.cover = res.data.fileId;
                    callback(err, res);
                })
                .catch(err => {
                    callback(err);
                });
        }
    }
});