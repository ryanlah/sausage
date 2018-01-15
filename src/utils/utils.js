// utils
var fso = require('./filesystem/fso');
var dbo = require('./mysql/dbo');
var tool = require('./tool/tool');
var pager = require('./tool/pager');

var utils = {
    fso : new fso(),
    dbo : new dbo(),
    tool : new tool(),
    pager : new pager()
};

module.exports = utils;