
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    displayDate,
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function displayDate(date) {
    if (typeof date !== 'object') return;

    const today = new Date();
    if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()  && date.getDate() === today.getDate()) {
        return new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
    } else if (date.getFullYear() === today.getFullYear()) {
        return new Intl.DateTimeFormat([], { month: 'short', day: 'numeric' }).format(date);
    } else {
        return new Intl.DateTimeFormat([], { day: '2-digit', month: '2-digit', year: '2-digit' }).format(date);
    }   
}
