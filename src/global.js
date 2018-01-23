var globalVariables = {
    server : {
        port : 8099
    },
    mySql : {
        address : '192.168.221.130',
        port : 3306,
        schema : 'sausage',
        user : 'root',
        pass : 'root',
        connectionLimit : 10
    },
    varibales : {
        uploadCache : 'D:\\sgk\\cache',
        staticFilesPath : 'D:\\sgk\\files',
        pageSize : 20,
    },
    image : {
        thumb : {
            height : 400,
            width : 400,
            quality : 80
        },
        highRes : {
            minLength : 1200,
            quality : 80
        },
        midRes : {
            minLength : 800,
            quality : 80
        },
        original : {
            quality : 80
        },
        core : "im", 
        format : "JPEG"
    }
};

module.exports = globalVariables;