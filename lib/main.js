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
      stack.push(arg);
    } else {
      arg();
    }
  }

  const runAllFunctions = function() {
    stack.forEach((func) => {
      func();
    });
  };

  window.onload = runAllFunctions;
};

window.$l.extend = function(...objects) {
  let merged = {};
  objects.forEach((obj) => {
    for (let key in obj) {
      merged[key] = obj[key];
    }
  });
  return merged;
};

window.$l.ajax = function(options) {
  const defaults = {
    success: function() {console.log("success");},
    error: function() {},
    url: "",
    type: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  options = this.extend(defaults, options);
  const xhr = new XMLHttpRequest();
  xhr.open(options.type, options.url);
  xhr.onload = options.success;
  xhr.send(options.data);
};

// window.$l(() => {
//   console.log('hi');
// });
// window.$l(() => {
//   console.log('hey');
// });
// window.$l(() => {
//   console.log('hola');
// });
// window.$l(() => {
//   console.log('1');
// });
// window.$l(() => {
//   console.log('2');
// });
// window.$l(() => {
//   console.log('3');
// });
