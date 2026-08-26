// expensive function that we want to throttle
function expensiveFunctionThrottle() {
  const timestamp = new Date().toLocaleTimeString();
  appendOutput("throttleOutput", `Throttled at ${timestamp} — Button pressed.`);
  console.log("Throttled function executed at", timestamp);
}

function throttle(func, delay) {
  let callHappen = false;

  return function (...args) {
    if (!callHappen) {
      callHappen = true;
      func.apply(this, args);
      setTimeout(() => {
        callHappen = false;
      }, delay);
    }
  };
}

const throttledExpensiveFunction = throttle(expensiveFunctionThrottle, 2000);
