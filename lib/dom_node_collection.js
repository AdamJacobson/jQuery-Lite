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
