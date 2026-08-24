// Flatten a nested array without using Array.prototype.flat()
function flatten(input) {
    const result = [];

    function helper(value) {
        if (Array.isArray(value)) {
            for (const item of value) {
                helper(item);
            }
        } else {
            result.push(value);
        }
    }

    helper(input);
    return result;
}

// Example usage:
const nested = [1, [2, [3, 4], 5], [6, 7], 8];
console.log(flatten(nested)); // [1, 2, 3, 4, 5, 6, 7, 8]



