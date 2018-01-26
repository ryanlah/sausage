function routerExtend(){

}

routerExtend.prototype.sendError = function(next, code, message){
    let err = new Error(message);
    err.status = code;
    next(err);
};

routerExtend.prototype.send500 = function(next){
    this.sendError(next, 500, "Internal Server Error");
};

routerExtend.prototype.send401 = function(next, code, message){
    this.sendError(next, 401, "Unauthorized");
};

routerExtend.prototype.getPageDataMaker = function(controller){
    return new pageDataMaker();
};

function pageDataMaker(controller){
    this.controller = controller;
    this.getPageData = (pageData) => {
        pageData.currentPage = this.controller;
        return pageData;
    };
};

module.exports = routerExtend;