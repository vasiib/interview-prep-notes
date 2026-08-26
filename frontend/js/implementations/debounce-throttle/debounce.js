// expensive function that we want to debounce
function expensiveFunctionDebounce(value) {
  const timestamp = new Date().toLocaleTimeString();
  appendOutput('debounceOutput', `Debounced at ${timestamp} — Search term: "${value}"`);
  console.log('Debounced function executed:', value);
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const debouncedExpensiveFunction = debounce(expensiveFunctionDebounce, 500);
