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
        thumbSize : {
            height : 400,
            width : 400
        }
    }
};

module.exports = globalVariables;