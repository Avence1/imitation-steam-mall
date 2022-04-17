export default class Commpents extends EventTarget {
  elem;
  constructor(type) {
    super();
    this.elem = document.createElement(type);
  }
  appendTo(parent) {
    if (typeof parent === "string") parent = document.querySelector(parent);
    if (parent && parent instanceof HTMLElement) parent.appendChild(this.elem);
    return parent;
  }
}
