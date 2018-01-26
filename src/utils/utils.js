// utils
var fso = require('./filesystem/fso');
var dbo = require('./mysql/dbo');
var tool = require('./tool/tool');
var pager = require('./tool/pager');
var dobj = require('./tool/dynamicObject');
var rext = require('./tool/routerExtend');
var logger = require('./tool/log');

var utils = {
    fso : new fso(),
    dbo : new dbo(),
    tool : new tool(),
    pager : new pager(),
    dobj : new dobj(),
    rext : new rext(),
    logger : new logger()
};

module.exports = utils;