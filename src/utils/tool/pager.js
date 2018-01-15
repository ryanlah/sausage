function pager (){
    
}

pager.prototype.calculate = function(total, index, urlBase){
    let pager = {};

    pager.index = index;
    pager.total = total;
    pager.urlBase = urlBase;
    pager.pages = [];

    pager.isFirstPage = index == 1;
    pager.isLastPage =  index == total;

    pager.firstPage = this.format("First", 1, pager.isFirstPage ? "disabled" : "", urlBase);
    pager.lastPage = this.format("Last", total, pager.isLastPage ? "disabled" : "", urlBase);
    pager.nextPage = this.format("Next", pager.isLastPage ? total : index + 1, pager.isLastPage ? "disabled" : "", urlBase);
    pager.previousPage = this.format("Previous", pager.isFirstPage ? 1 : index - 1, pager.isFirstPage ? "disabled" : "", urlBase);

    let startIndex = 1;
    let endIndex = total;

    if(total > 5){
        if(index < 3){
            startIndex = 1;
            endIndex = 5;
        }else if (index > total - 2){
            startIndex = total - 4;
            endIndex = total;
        }else{
            startIndex = index - 2;
            endIndex = index + 2;
        }
    }

    for(let i = startIndex; i<=endIndex; i++){
        pager.pages.push(this.format(i, i, i == index ? "active" : "", urlBase));
    }

    return pager;
}
pager.prototype.format = function(title, index, style, urlBase){
    return {
        title : title,
        index : index,
        style : style,
        url : urlBase + index
    };
}

module.exports = pager;