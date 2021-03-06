/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(array) {
    this.array = array;
  }

  html(str) {
    if (!str) {
      return this.array[0];
    } else {
      this.array.forEach((el) => {
        el.innerHTML = str;
      });
    }
  }

  empty() {
    this.array.forEach((el) => {
      el.innerHTML = "";
    });
  }

  append(arg) {
    if (arg instanceof DOMNodeCollection) {
      this.array.forEach((el) => {
        arg.array.forEach((x) => {
          el.appendChild(x.cloneNode(true));
        });
      });
    }
  }

  attr(name, value) {
    this.array.forEach((el) => {
      if (value === undefined) {
        el.getAttribute(name);
      } else {
        return el.setAttribute(name, value);
      }
    });
  }

  addClass(className) {
    this.array.forEach((el) => {
      el.classList.add(className);
    });
  }

  removeClass(className) {
    this.array.forEach((el) => {
      el.classList.remove(className);
    });
  }

  children() {
    let children = [];
    this.array.forEach((el) => {
      children = children.concat(el.children);
    });
    return new DOMNodeCollection(children);
  }

  parent() {
    let parents = [];
    this.array.forEach((el) => {
      parents = parents.concat(el.parentElement);
    });
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let foundElements = [];
    this.array.forEach((el) => {
      foundElements = foundElements.concat(el.querySelectorAll(selector));
    });
    return new DOMNodeCollection(foundElements);
  }

  remove() {
    this.array.forEach((el) => {
      el.remove();
    });
    this.array = [];
  }

  on(e, callback) {
    this.array.forEach((el) =>{
      el.callback = callback;
      el.addEventListener(e, callback);
    });
  }

  off(e) {
    this.array.forEach((el) => {
      el.removeEventListener(e, el.callback);
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);