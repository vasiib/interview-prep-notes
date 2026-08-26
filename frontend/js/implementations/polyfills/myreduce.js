// native reduce method example
const inpArr = [1, 4, 5, 6, 2, 7, 10];
// inputs to reduce: callback and initialValue?
/* 
if initialValue is not provided, the first element of the array will be 
used as the initial value and the iteration will start from the second element.
*/
const output = inpArr.reduce((previousValue, currentValue, index, originalArray) => {
    return previousValue + currentValue;
}, 0);

console.log(output); // Output: 35

//------------------------------ polyfill -start---------------------------------------
Array.prototype.myreduce = function (callback, initialValue) {
    if (this === null || this === undefined) {
        throw new TypeError("Array.prototype.myreduce called on null or undefined");
    }
    if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
    }

    // contextObj is just used for length calculation
    const contextObj = Object(this);
    const length = contextObj.length >>> 0;

    // assuming initialValue is not provided, we need to use the first element of the array as the initial value and start the iteration from the second element.
    let accumulatorValue = contextObj[0];
    let startIndex = 1;

    if(initialValue !== undefined) {
        accumulatorValue = initialValue;
        startIndex = 0;
    }

    for (let k = startIndex; k < length; k++) {
        // skipping holes in the array, so that callback won't be called for indexes that don't exist in the original array. This is done by checking if the index k exists in the context object.
        if (k in this) {
            const currentValue = this[k];
            const indexNum = k;
            accumulatorValue = callback(accumulatorValue, currentValue, indexNum, this);
        }
    }

    return accumulatorValue;
};

//-------------------------------- polyfill - end----------------------------------------


//*******************************************************
// Example usage:
//*******************************************************

// Test the myreduce method
const output2 = inpArr.myreduce((previousValue, currentValue, index, originalArray) => {
    return previousValue + currentValue;
}, 10);
console.log(output2); // Output: 45

// Test myreduce without initialValue
const output3 = inpArr.myreduce((previousValue, currentValue, index, originalArray) => {
    return previousValue + currentValue;
});
console.log(output3); // Output: 35

// sparse array example
const sparseArray = [1, , 3, 4];
const reducedSparse = sparseArray.myreduce((acc, x) => acc + x, 0);
console.log(reducedSparse); // Output: 8
