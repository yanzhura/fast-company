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
