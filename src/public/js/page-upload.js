// Upload Big File

const BYTES_PER_SLICE = 1024 * 1024 * 1024;

Vue.prototype.$http = axios;
var mainView = new Vue({
    el : '#app',
    data :{
        form : {
            
        },
        uploadPrecentage : 0
    },
    methods : {
        setFile : function(event){
            this.form.file = event.target.files[0];
        },
        submitFiles : function(){
            if(this.form.file.size < BYTES_PER_SLICE){
                let fileName = (new Date()).getTime();
                this.uploadSingle(fileName, this.file, (err, res) => {
                    console.log('Uploaded.');
                });
            }
        }
    }
});

