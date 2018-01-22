function testData() {
    var data = [
        {id:1, name : "My Favorite", src : "/img/collection-bg.jpg", checked : false, style : false},
        {id:2, name : "My Favorite", src : "/img/collection-bg.jpg", checked : false, style : false},
        {id:3, name : "My Favorite", src : "/img/collection-bg.jpg", checked : false, style : false},
        {id:4, name : "My Favorite", src : "/img/collection-bg.jpg", checked : false, style : false},
        {id:5, name : "My Favorite", src : "/img/collection-bg.jpg", checked : false, style : false},
        {id:6, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : false},
        {id:7, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : false},
        {id:8, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : false},
        {id:9, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : false},
        {id:10, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : false},
        {id:11, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : false},
        {id:12, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : false},
        {id:13, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : false},
        {id:14, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : false},
        {id:15, name : "My Favorite", src : "/img/img-thumb.jpg", checked : false, style : false}
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
        enableDelete : false,
        enableParent : false,
        enableOpen : false,
        source : testData(),
        collectionId : 0
    },
    methods : {
        checkThumb : function(item){
            item.checked = !item.checked;
            if(item.checked){
                item.style = true;
            }else{
                item.style = false;
            }
            this.handleCheckedState();
        },
        handleCheckedState : function(){
            let selected = this.getSelected();
            this.enableDelete = selected.length > 0;
            this.enableOpen = selected.length == 1;
        },
        getSelected : function(){
            let selected = [];
            this.source.forEach(item => {
                if(item.checked){
                    selected.push(item.id);
                }
            });
            return selected;
        },
        createNew : function(){
            let url = "/manage/collection/create/" + this.collectionId;
            this.redirect(url);
        },
        editSelected : function(){
            let url = "/manage/collection/edit/" + this.selected[0].id;
            this.redirect(url);
        },
        deleteSelected : function(){
            this.closeConfirmDialog();
        },
        goParent : function(){

        },
        openSelected : function(){
            let url = "/manage/collection/detail/" + this.selected[0].id;
            this.redirect(url);
        },
        selectAllChecked : function(event){
            let checked = event.target.checked;
            this.source.forEach(item => {
                if(item.checked != checked){
                    this.checkThumb(item);
                }
            });
        },
    }
});