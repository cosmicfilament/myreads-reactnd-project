
const helpers = {};

// found that most if not all images had this width
helpers.imageWidth = 128;

helpers.shelves = {
    move: 'Move',
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want To Read',
    read: 'Read',
    none: 'None'
};

helpers._typeof = (value) => {
    if (value === null) {
        return value;
    }
    if (typeof (value) === 'undefined') {
        return 'undefined';
    }
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

helpers.validateString = (str) => {
    if (helpers._typeof(str) === 'string' && str.length > 0) {
        return str;
    }
    return false;
};

helpers.validateArray = (obj) => {
    if (helpers._typeof(obj) === 'array' && obj instanceof Array && obj.length > 0) {
        return obj;
    }
    return false;
};

helpers.validateObject = (obj) => {
    if (typeof (obj) === 'object' && obj !== null && Object.keys(obj).length > 0) {
        return obj;
    }
    return false;
};

export default helpers;
