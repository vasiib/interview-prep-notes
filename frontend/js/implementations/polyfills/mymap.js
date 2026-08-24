// native map method example
const numbersNative = [1, 2, 3, 4];
// inputs to map: callback and thisArg?
const doubledNative = numbersNative.map((num, index, originalArray) => {
  return num * 2;
});
console.log(doubledNative); // Output: [2, 4, 6, 8]

//------------------------------ polyfill -start---------------------------------------
Array.prototype.mymap = function (callback, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError("Array.prototype.mymap called on null or undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  // while .map is called on an array, it can be called on any object that has a length property and indexed elements.
  // So we convert the context (this) to an object and get its length property.
  const contextObj = Object(this);

  // The length property is converted to an unsigned integer. This is done to handle cases where the length might be negative or not a number.
  const length = contextObj.length >>> 0;

  // Create a new array with the same length as the original
  // As map is the only method which promises to return an array of the same length as the original, we create a new array with the same length.
  const newArray = new Array(length);

  console.log("contextObj", contextObj);

  for (let k = 0; k < length; k++) {
    // Skipping holes in the array, so that callback won't be called for indexes that don't exist in the original array.
    // This is done by checking if the index k exists in the context object.
    
    if (k in contextObj) {
      const currentValue = contextObj[k];
      const indexNum = k;
      const mappedValue = callback.call(thisArg, currentValue, indexNum, this);
      newArray[indexNum] = mappedValue;
    }
  }

  return newArray;
};
//------------------------------- polyfill - end----------------------------------------

//*******************************************************
// Example usage:
//*******************************************************
const numbers = [1, 2, 3, 4];
const doubled = numbers.mymap((x) => x * 2);
console.log(doubled); // Output: [2, 4, 6, 8]

// sparse array example
const sparseArray = [1, , 3, 4];
const mappedSparse = sparseArray.mymap((x) => x * 2);
console.log(mappedSparse); // Output: [2, <1 empty item>, 6, 8]


// array-like object example
const arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};
const mappedArrayLike = Array.prototype.mymap.call(arrayLike, (x) => x.toUpperCase());
console.log(mappedArrayLike); // Output: ['A', 'B', 'C']


