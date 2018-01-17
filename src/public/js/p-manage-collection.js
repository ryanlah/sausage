function testData() {
    var data = [
        {id:1, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""},
        {id:2, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""},
        {id:3, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""},
        {id:4, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""},
        {id:5, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""},
        {id:6, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""},
        {id:7, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""},
        {id:8, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""},
        {id:9, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""},
        {id:10, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""},
        {id:11, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""},
        {id:12, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""},
        {id:13, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""},
        {id:14, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""},
        {id:15, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : ""}
    ];

    return data;
};

Vue.prototype.openConfirmDialog = () => {$("#deleteConfirm").modal("show");};
Vue.prototype.closeConfirmDialog = () => {$("#deleteConfirm").modal("hide");};
Vue.prototype.toggleConfirmDialog = () => {$("#deleteConfirm").modal("toggle");};
Vue.prototype.redirect = (url) => {window.location.href=url;};

var app = new Vue({
    el : "#app",
    data : {
        enableEdit : false,
        enableDelete : false,
        enableCheck : false,
        selected : [],
        source : testData(),
        collectionId : 0
    },
    methods : {
        checkThumb : function(item){
            item.checked = !item.checked;
            if(item.checked){
                item.style = "thumb-icon";
                this.selectOne(item);
            }else{
                item.style = "";
                this.removeOne(item);
            }
            this.setButtons(this.selected.length);
        },
        selectOne : function(item){
            this.selected.push(item);
        },
        removeOne : function(item){
            let index = 0;
            for(let i=0; i< this.selected.length; i++){
                if(item.id == this.selected[i].id){
                    index = i;
                    break;
                }
            }
            this.selected.splice(index, 1);
        },
        setButtons :  function(length){
            this.enableDelete = length > 0;
        },
        editSelected : function(){
            let url = "/manage/collection/detail/" + this.selected[0].id;
            this.redirect(url);
        },
        deleteSelected : function(){
            this.closeConfirmDialog();
        },
        openSelected : function(item){
            
        },
        enableDelete : function(enable){
            this.source.forEach(item => {
                item.enable = enable;
            });
        },
    }
});