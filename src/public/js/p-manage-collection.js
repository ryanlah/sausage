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

var app = new Vue({
    el : "#app",
    data : {
        enableEdit : false,
        enableDelete : false,
        selected : [],
        source : testData()
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
            this.enableEdit = length == 1;
            this.enableDelete = length > 0;
        },
        editSelected : function(){
            let url = "/manage/collection/detail/" + this.selected[0].id;
            window.location.href = url;
        },
        deleteSelected : function(){
            $("#deleteConfirm").modal("hide");
        }
    }
});