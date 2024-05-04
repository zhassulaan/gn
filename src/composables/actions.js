function flattenedArray(arr) {
  return arr.flat();
}

function uniqueArray(arr) {
  return Array.from(new Set(arr));
}

function removeUndefined(arr) {
  return arr.filter(item => item !== undefined);
}

export { uniqueArray, flattenedArray, removeUndefined };