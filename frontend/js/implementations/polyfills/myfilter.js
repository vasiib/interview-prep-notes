// native filter example
const numbers = [1, 2, 3, 4, 10, 11, 12, 14, 9, 10];
// inputs to filter: callback and thisArg?
const doubled = numbers.filter((num, index, originalArray) => {
  if (num > 5) {
    return true;
  }
  return false;
});
console.log(doubled); // Output: [ 10, 11, 12, 14, 9, 10 ]

//------------------------------ polyfill -start---------------------------------------
Array.prototype.myfilter = function (callback, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError("Array.prototype.myfilter called on null or undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const contextObj = Object(this);
  const length = contextObj.length >>> 0;
  const resultArray = [];
  for (let k = 0; k < length; k++) {
    if (k in contextObj) {
      const currentValue = contextObj[k];
      const indexNum = k;
      if (callback.call(thisArg, currentValue, indexNum, this)) {
        resultArray.push(currentValue);
      }
    }
  }
  return resultArray;
};
//------------------------------- polyfill - end----------------------------------------


//*******************************************************
// Example usage:
//*******************************************************

const doubled2 = numbers.myfilter((num, index, originalArray) => {
  if (num > 5) {
    return true;
  }
  return false;
});
console.log(doubled2); // Output: [ 10, 11, 12, 14, 9, 10 ]

