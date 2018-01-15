// tool

function tool(){

};

tool.prototype.getDate = function(){
    let date = new Date();
    let result = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return result;
};

tool.prototype.getTime = function(){
    let date = new Date();
    let result = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return result;
};

tool.prototype.getFullDate = function(){
    let date = new Date();
    let result = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return result;
};

// Generate Name

tool.prototype.CONST_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
tool.prototype.CONST_NUMBERS = ['0','1','2','3','4','5','6','7','8','9'];
tool.prototype.CONST_SAFECHARS = ['2','3','4','5','6','7','9','A','C','D','E','F','G','H','J','K','M','N','P','Q','R','S','T','U','V','W','X','Y','Z'];

tool.prototype.generateName = function(){
    let name = (new Date()).getTime();
    return name;
};

tool.prototype.generateRandName = function(length){
    let mixChars = this.CONST_LETTERS.concat(this.CONST_NUMBERS);
    return this.generateChars(mixChars, length);
};

tool.prototype.generateLetters = function(length){
    return this.generateChars(this.CONST_LETTERS, length);
};

tool.prototype.generateNumbers = function(length){
    return this.generateChars(this.CONST_NUMBERS, length);
};

tool.prototype.generateSecurityCode = function(length){
    return this.generateChars(this.CONST_SAFECHARS, length);
};

tool.prototype.generateChars = function(chars, length){
    let randChars = [];
    for(let i =0; i<length;i++){
        let randIndex = Math.floor(Math.random() * chars.length);
        let randChar = chars[randIndex];

        randChars.push(randChar);
    }
    let result = randChars.join('');
    return result;
};


module.exports = tool;