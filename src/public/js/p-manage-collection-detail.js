Vue.component("tree-folder-contents",{
    template : '<div class="tree-sub"><div v-for="child in children"><tree-folder v-if="child.subs" :folder="child"/><span v-else><span :class="child.class"></span><span class="button-text">{{ child.name }}</span></span></div></div>',
    props:["children"]
});
Vue.component("tree-folder",{
    template : '<p><span :class="folder.class"></span><span class="button-text">{{ folder.name }}</span><tree-folder-contents :children="folder.subs"/></p>',
    props:["folder"]
});
var app = new Vue({
    el : "#app",
    data : {
    },
    methods : {
        selectParent : function(){
            
        },
        querySubs : function(parent){
            let subs = [
                {id : parent * 10, subs : [], name : "Sub" + (parent * 10 + 1), class:"glyphicon glyphicon-minus"},
                {id : parent * 10 + 2, subs : null, name : "Sub"  + (parent * 10 + 2), class:""}
            ];

            if(parent < 10000){
                subs[0].subs = this.querySubs(subs[0].id);
            }else{
                subs[0].subs = null;
                subs[0].class = "";
            }

            return subs;
        },
        addNodeTest : function(){

        }
    }
});