// utils
var fso = require('./filesystem/fso');

var utils = {
    fso : new fso(),
    dbo : new dbo(),
    tool : new tool()
};

module.exports = utils;