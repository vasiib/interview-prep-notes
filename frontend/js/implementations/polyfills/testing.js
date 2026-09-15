let myObj = {
  name: "vaseem",
  thisInNormal: function () {
    console.log(`this in normal function: ${this.name}`);
  },
  thisInArrow: () => {
    console.log(`this in arrow function: ${this.name}`);
  },
};
myObj.thisInNormal(); //this in normal function: vaseem
myObj.thisInArrow(); //this in arrow function: undefined, as there is no name property in the outer scope(global scope), and arrow functions do not have their own 'this' context

// defer vs async:
// defer: The defer attribute tells the browser to continue downloading the HTML page while the JavaScript file is being downloaded in the background. The script will be executed after the HTML document has been completely parsed. This is useful for scripts that do not need to be executed immediately and can wait until the page is fully loaded.
// async: The async attribute tells the browser to download the JavaScript file in the background while the HTML page is being downloaded. The script will be executed as soon as it is downloaded, without waiting for the HTML document to be completely parsed. This is useful for scripts that need to be executed as soon as possible, such as analytics or advertising scripts.
// By default, scripts are executed in the order they are encountered in the HTML document. However, when using defer or async, the order of execution may not be guaranteed, as the scripts may be executed at different times depending on their download and execution times.

var scope = "global scope";
function check() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f;
}

console.log(check()()); // local scope, because the function f is a closure that has access to the scope variable in the check function, which is the local scope.

const b = {
  name: "Vaseem",
  f: function () {
    var self = this;
    console.log(this.name);
    (function () {
      console.log(this.name);
      console.log(self.name);
    })();
  },
};
b.f(); // Vaseem, undefined, Vaseem. The first console.log(this.name) refers to the name property of the b object, which is "Vaseem". The second console.log(this.name) refers to the name property of the global object (window in browsers), which is undefined. The third console.log(self.name) refers to the name property of the b object, which is "Vaseem".
