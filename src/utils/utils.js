// utils
var fso = require('./filesystem/fso');
var dbo = require('./mysql/dbo');
var tool = require('./tool/tool');
var pager = require('./tool/pager');
var dobj = require('./tool/dynamicObject');

var utils = {
    fso : new fso(),
    dbo : new dbo(),
    tool : new tool(),
    pager : new pager(),
    dobj : new dobj()
};

module.exports = utils;