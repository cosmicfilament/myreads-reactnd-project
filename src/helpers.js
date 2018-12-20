
const helpers = {};

helpers.parseJsonToObject = (str = '') => {
    // gets rid of nuisance error output when there is no JSON data
    if (!str) return false;

    try {
        return JSON.parse(str);
    } catch (err) {
        return {};
    }
};

// used in the multiselect control
helpers.shelves = {
    move: 'Move',
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want To Read',
    read: 'Read',
    none: 'None'
};

// grabbed the idea for this from http://bonsaiden.github.io/JavaScript-Garden/#types.typeof
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

// default image
helpers.defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACqCAIAAADqa9DMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGXWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTEyLTE4VDE3OjA2OjU4LTA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTE4VDE3OjA2OjU4LTA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0xMi0xOFQxNzowNjo1OC0wNTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphOWI3NGFiMS1iNWQ0LTNkNDMtODAxNi1mOTk4OWU1ZWZmMTEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4ZTNhY2M2ZC00NDBkLWRkNDAtYjJhNi0yZmU1NmIzNDc0MDUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkZDhkMzEzNi03NmUxLWE1NGItOTU5ZC04NTZiNDIyMjg3NjQiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkZDhkMzEzNi03NmUxLWE1NGItOTU5ZC04NTZiNDIyMjg3NjQiIHN0RXZ0OndoZW49IjIwMTgtMTItMThUMTc6MDY6NTgtMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YTliNzRhYjEtYjVkNC0zZDQzLTgwMTYtZjk5ODllNWVmZjExIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTE4VDE3OjA2OjU4LTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iTm8gSW1hZ2UiIHBob3Rvc2hvcDpMYXllclRleHQ9Ik5vIEltYWdlIi8+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6VGV4dExheWVycz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5hhlo7AAADU0lEQVR42u3ZMUscQQAFYLEwYCPEwkIQJIIgCEaQVGlSpUmTIk2aFPn/vyEveWQY9o4L8aLm9Dsex93ezuzufDOz47r3/e5OnjB7mgAAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEADPFODz1VWy2Pj15iYbv93e/lVV9yv10gH2fr0+XV7OG9+fnWXjKszm3K8UgJ+vV/v7c88F8KgArw8O8v725ATA0wCk4Wow2m7RlBkc4cko6XDJ57UT/Vzqy/X1m6OjD+fn2bml8jWlMtddHR93zH28uFhbf/ZM8VFtqxo/pdS8Qz60wvakxVy6MwA5717AalOmdU4PD9vu2d6rzZZVg7lU3vd+v1KkNfQ9DT1Uct9u2WzMbqmhP40zSfsWpkfP9n7tUVI8X5NIJ4tutDMA6VD50F6Wi1w0ZT+/Oz0dRWqQC94AkKZpE7dgtNpwHQfZku1rKxn1t48vjjXq6VGqNVq8B02RnQRob2qvnJuy3XZ01fbKUWrDPWCxT4HHrx0i9W4yCjvC5o7cETMfpXL9tQOiK+mmW3YSYLRgvs5N2Y68odT2AGOWS9tltwXA4kCr57b62lWA0d878HuRHRaLP7j+LUBnkjEaFk087gfNPO30vrLzq6C5mdou8zxbjLFiWXtX2BKgP61t4naIsbbJWJnHR3+dl0w7DzAm2cV6pqvGXGruh/063xW2BKhxPqfO1j/27PIsh8tZZYe2+OqvObfeA1J89cR2DGCx0uh1jkV654S1ne7eAGOtOS9Sx5jL0dvrW+F8E06y23xui8H6rJ6Gtos90HiPeuv/47O8DpdFNx+roMd8FPhSHkcv/ipevS37f8DDtn6XOpmXxgOJx3ze8NIBMqVk0k/TZ6IPQ+af/+dhn/+IAQAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAAABNAACAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAADI9vkB2I92IRXSk/4AAAAASUVORK5CYII=";

export default helpers;
