let currentCol = JSON.parse($("#collectionData").val());
Vue.prototype.showCoverDialog = () => {$("#uploadCoverFile").trigger("click")};

var app = new Vue({
    el : "#app",
    data : {
        model : {
            name : "",
            type : "c",
            cover : "",
            desc : ""
        },
        collection : currentCol,
        showErrorTip : false,
        preview : "/img/cover-bg.jpg",
        isValid : true,
        validations : {
            name : {
                isValid : true,
                class : "form-group",
                validate : () => {
                    if(that.model.name.trim() == ""){
                        that.validations.name.class = "form-group has-error";
                        that.validations.name.isValid = false;
                    }else{
                        that.validations.name.class = "form-group";
                        that.validations.name.isValid = true;
                    }
                    
                    return that.validations.name.isValid;
                }
            }
        }
    },
    methods : {
        save : function(){
            this.validate();
        },
        cancel : function(){
            this.showErrorTip = true;
        },
        uploadCover : function(){
            this.showCoverDialog();
        },
        setCoverFile : function(event){
            this.preview = window.URL.createObjectURL(event.target.files[0]);
        },
        validate : function(){
            for(var key in this.validations){
                let isValid = this.validations[key].validate();
                if(!validation.isValid){
                    this.isValid = isValid;
                }
            }
        }
    }
});