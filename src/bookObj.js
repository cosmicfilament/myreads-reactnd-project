
export default function BookObj() {
    this.title = '';
    this.subtitle = '';
    this.authors = [];
    this.publisher = '';
    this.description = '';
    this.pageCount = 0;
    this.url = '';
    this.id = '';
    this.shelf = '';
    this.shelfIndexArray = ['move', 'currentlyReading', 'wantToRead', 'read', 'none'];
};

BookObj.prototype.create = function (obj) {

    if (typeof (obj) === 'object' && obj !== null & Object.keys(obj).length > 0) {

        const thisBook = new BookObj();
        const keys = Object.keys(obj);

        for (let key of keys) {
            if (thisBook.hasOwnProperty(key)) {
                thisBook[key] = keys[key];
            }
            if (key === 'imageLinks') {
                thisBook[key] = obj[key].thumbnail;
            }
        }
        return thisBook;
    }
    return null;
}

BookObj.prototype.getShelfByIndex = function () {
    return this.shelfIndexArray.indexOf(this.shelf);
};

BookObj.prototype.setShelfByIndex = function (index) {
    this.shelf = this.shelfIndexArray[index];
}
