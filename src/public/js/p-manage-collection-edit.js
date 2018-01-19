const UPLOAD_CONFIG = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};

let originalData = JSON.parse($("#originalData").val());
Vue.prototype.showCoverDialog = () => {$("#uploadCoverFile").trigger("click")};
Vue.prototype.$http = axios;

var app = new Vue({
    el : "#app",
    data : {
        model : {
            name : "",
            type : "c",
            cover : "",
            desc : ""
        },
        original : originalData,
        preview : "/img/cover-bg.jpg",
        nameHasError : false,
        coverFile : null
    },
    methods : {
        cancel : function(){
            let url = "/manage/collection";

        },
        uploadCover : function(){
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
                let json = this.generateJson();
                let url = this.fetchUrl();

                this.postData(url, json, err => {
                    console.log(err);
                });
            }
        },
        postData : function(url, json, callback){
            this.$http.post(url, json)
                .then(res => {
                    let err = res.status == 200 ? null : new DOMException(res.status);
                    callback(err);
                })
                .catch(err => {
                    callback(err);
                });
        },
        generateJson : function(){
            let json = {};

            if(this.model.type == "c"){ 
                json.parent = this.original.parent;
                json.name = this.model.name;
            }

            if(this.original.id > 0){
                json.id = this.original.id; 
            }

            return json;
        },
        fetchUrl : function(){
            let type = this.model.type == "c" ? "collection" : "gallery";
            let mode = this.original.id > 0 ? "edit" : "create";
            return `/api/manage/${type}/${mode}`;
        },
        submitGallery : function(){
            let formData = new FormData();
            formData.append("file", this.coverFile);
            formData.append("", )

            this.$http.post("/api/manage/collection/create", formData, UPLOAD_CONFIG)
            .then(res => {
                let err = res.status == 200 ? null : new DOMException(res.status);
                callback(err);
            })
            .catch(err => {
                callback(err);
            });
        }
    }
});