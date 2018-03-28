var globalVariables = {
    server : {
        port : 8099
    },
    mySql : {
        address : 'localhost',
        port : 3306,
        schema : 'sausage',
        user : 'root',
        pass : '',
        connectionLimit : 10
    },
    varibales : {
        uploadCache : 'E:\\SausageWeb\\Cache',
        coverFilePath : 'E:\\SausageWeb\\Files\\Cover',
        staticFilesPath : 'E:\\SausageWeb\\Files',
        pageSize : 20,
        logFile : 'E:\\SausageWeb\\Log',
        newLine : '\r\n'
    },
    image : {
        thumb : {
            height : 400,
            width : 400,
            quality : 80
        },
        core : "im", 
        format : "JPEG"
    }
};

module.exports = globalVariables;