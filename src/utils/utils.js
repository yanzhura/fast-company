export function paginate(itemsArray, currentPage, pageSize) {
    const firstUserIndex = (currentPage - 1) * pageSize;
    return [...itemsArray].splice(firstUserIndex, pageSize);
}
