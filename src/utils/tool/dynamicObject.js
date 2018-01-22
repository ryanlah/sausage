
function dynamicObject(){};

dynamicObject.prototype.newObj = function(properties){
    let obj = {};
    properties.forEach(property => {
        Object.defineProperty(obj, property.name, {
            value : property.value
        })
    }, this);
    return obj;
};

module.exports = dynamicObject;