export function paginate(itemsArray, currentPage, pageSize) {
    const firstUserIndex = (currentPage - 1) * pageSize;
    return [...itemsArray].splice(firstUserIndex, pageSize);
}

export function objectToArray(object) {
    let resultArray = [];
    if (!Array.isArray(object)) {
        resultArray = Object.keys(object).map((key) => object[key]);
    } else {
        resultArray = object;
    }
    return resultArray;
}

export function getDateFromNow(timestamp) {
    const date = new Date(parseInt(timestamp));
    const now = Date.now();
    const diffInMinutes = Math.floor((now - parseInt(timestamp)) / 1000 / 60);
    if (diffInMinutes <= 1) {
        return `1 минуту назад`;
    } else if (diffInMinutes > 1 && diffInMinutes <= 5) {
        return `5 минут назад`;
    } else if (diffInMinutes > 5 && diffInMinutes <= 10) {
        return `10 минут назад`;
    } else if (diffInMinutes > 10 && diffInMinutes <= 30) {
        return `30 минут назад`;
    } else if (diffInMinutes > 30 && diffInMinutes <= 60 * 24) {
        return `${date.toLocaleString('ru', {
            hour: 'numeric',
            minute: 'numeric'
        })}`;
    } else if (
        diffInMinutes > 60 * 24 &&
        diffInMinutes <= 60 * 24 * 365 &&
        new Date(now).getFullYear() === date.getFullYear()
    ) {
        return `${date.toLocaleString('ru', {
            month: 'long',
            day: 'numeric'
        })}`;
    } else {
        return `${date.toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`;
    }
}
