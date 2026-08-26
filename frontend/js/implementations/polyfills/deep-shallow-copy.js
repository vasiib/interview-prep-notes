/**
 * Create a shallow copy of an object or array.
 * Primitives are returned as-is.
 */
function shallowCopy(value) {
  if (Array.isArray(value)) {
    return [...value];
  }

  if (value && typeof value === "object") {
    return Object.assign({}, value);
  }

  return value;
}

/**
 * Create a deep copy of plain objects, arrays, maps, sets, dates, and regex.
 * Functions and symbols are copied by reference.
 */
function deepCopy(value, seen = new WeakMap()) {
  // Handle primitive types and functions
  // For all other data types, the type of value will be "object" (including null), except for functions, which will have the type "function". Therefore, we can check if the value is null or not an object to determine if it's a primitive type or a function.
  
  if (value === null || typeof value !== "object") {
    return value;
  }

  // key to handle circular references
  if (seen.has(value)) {
    return seen.get(value);
  }

  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }

  if (value instanceof Map) {
    const copiedMap = new Map();
    seen.set(value, copiedMap);
    value.forEach((v, k) =>
      copiedMap.set(deepCopy(k, seen), deepCopy(v, seen)),
    );
    return copiedMap;
  }

  if (value instanceof Set) {
    const copiedSet = new Set();
    seen.set(value, copiedSet);
    value.forEach((entry) => copiedSet.add(deepCopy(entry, seen)));
    return copiedSet;
  }

  if (Array.isArray(value)) {
    const copiedArray = [];
    seen.set(value, copiedArray);
    for (let i = 0; i < value.length; i += 1) {
      copiedArray[i] = deepCopy(value[i], seen);
    }
    return copiedArray;
  }

  const copiedObject = {};
  seen.set(value, copiedObject);

  for (const key of Object.keys(value)) {
    copiedObject[key] = deepCopy(value[key], seen);
  }

  return copiedObject;
}

//example usage
const original = {
  name: "Alice",
  age: 30,
  hobbies: ["reading", "hiking"],
  address: {
    city: "Wonderland",
    zip: "12345",
  },
  createdAt: new Date(),
  pattern: /abc/g,
};

// const shallow = shallowCopy(original);
// const deep = deepCopy(original);

// console.log('Original:', original);
// console.log('Shallow Copy:', shallow);
// console.log('Deep Copy:', deep);

deepCopy([
  "vaseem",
  "khan",
  "vaseem khan",
  "vaseem khan 1",
  "vaseem khan 2",
  "vaseem khan 3",
  "vaseem khan 4",
  "vaseem khan 5",
  "vaseem khan 6",
  "vaseem khan 7",
  "vaseem khan 8",
  "vaseem khan 9",
  "vaseem khan 10",
  "vaseem",
]);
