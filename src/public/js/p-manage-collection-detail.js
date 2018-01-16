var app = new Vue({
    el : "#app",
    data : {},
    methods : {
        selectParent : function(){
            
        },
        querySubs : function(parent){
            return [
                {id : 1, hasSub : true, name : "Sub 1", class:"glyphicon glyphicon-plus"},
                {id : 2, hasSub : false, name : "Sub 2", class:"glyphicon glyphicon-minus"}
            ];
        }
    }
});