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
