
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    displayShortDate,
    displayFullDate,
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

function displayShortDate(date) {
    if (typeof date !== 'object') return;

    const today = new Date();
    if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
        return new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
    } else if (date.getFullYear() === today.getFullYear()) {
        return new Intl.DateTimeFormat([], { month: 'short', day: 'numeric' }).format(date);
    } else {
        return new Intl.DateTimeFormat([], { day: '2-digit', month: '2-digit', year: '2-digit' }).format(date);
    }
}

function displayFullDate(date) {
    if (typeof date !== 'object') return;

    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let formattedDate = date.toLocaleDateString(undefined, options);
  
    // Calculate the time difference in days
    const today = new Date();
    const timeDiff = today - date;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
    // Append "(x days ago)" if within 14 days
    if (daysAgo <= 14) {
      formattedDate += ` (${daysAgo} days ago)`;
    }
  
    return formattedDate;
}
