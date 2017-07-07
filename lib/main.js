const DOMNodeCollection = require('./dom_node_collection.js');

const stack = [];

window.$l = function(arg) {
  if (typeof arg === "string") {
    let nodeList = document.querySelectorAll(arg);
    return new DOMNodeCollection(nodeList);
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection(arg);
  } else if (arg instanceof Function) {
    if ( document.readyState !== 'complete' ) {
      console.log("push");
      stack.push(arg);
      console.log(stack);
    } else {
      arg();
    }
  }

  const runAllFunctions = function() {
    console.log(stack);
    console.log("runall");
    stack.forEach((func) => {
      func();
    });
  };

  window.onload = runAllFunctions;
};

window.$l(() => {
  console.log('hi');
});
window.$l(() => {
  console.log('hey');
});
window.$l(() => {
  console.log('hola');
});
window.$l(() => {
  console.log('1');
});
window.$l(() => {
  console.log('2');
});
window.$l(() => {
  console.log('3');
});
