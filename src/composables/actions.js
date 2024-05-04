function flattenedArray(arr) {
  return arr.flat();
}

function removeUndefined(arr) {
  return arr.filter(item => item !== undefined);
}

function uniqueArray(arr) {
  return Array.from(new Set(arr));
}

function addID(arr) {
  return arr.map((el, index) => ({ id: `cb${index + 1}`, value: el }));
}

export { flattenedArray, removeUndefined, uniqueArray, addID };
