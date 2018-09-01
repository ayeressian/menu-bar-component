import template from './template.js';

class MenuBar extends HTMLElement {
  constructor() {
    super();
    this._shadowDom = this.attachShadow({
      mode: 'closed'
    });
    this._shadowDom.innerHTML = template;
    this._dropDown = this._shadowDom.querySelector('.dropdown');
  }

  _onClick(item, event) {
    const viewportOffset = event.target.getBoundingClientRect();
    this._dropDown.style.display = 'inline-block';
    this._dropDown.style.top = viewportOffset.bottom + 'px';
    this._dropDown.style.left = viewportOffset.left + 'px';

    if (item.items != null) {
      this._dropDown.innerHTML = '';
      const ulElem = document.createElement('ul');
      item.items.forEach((innerItem) => {
        const li = document.createElement('li');
        li.innerHTML = innerItem.title;
        li.addEventListener('click', this._onClickInner.bind(this, innerItem));
        ulElem.appendChild(li);
      });
      this._dropDown.appendChild(ulElem);
    }
  }

  _onClickInner(item, event) {
    this.dispatchEvent(new CustomEvent('select', { detail: item.id }));
    this._dropDown.style.display = 'none';
  }

  set config(config) {
      config.items.forEach((item) => {
        const li = document.createElement('li');
        li.addEventListener('click', this._onClick.bind(this, item));
        li.innerHTML = item.title;
        const menuBar = this._shadowDom.querySelector('.menu_bar');
        menuBar.appendChild(li);

        this._shadowDom.addEventListener('click', (event) => {
          if (event.target.nodeName !== 'LI') {
            this._dropDown.style.display = 'none';
          }
        });
        document.addEventListener('click', (event) => {
          if (event.target !== this) {
            this._dropDown.style.display = 'none';
          }
        });
      });
  }
}

customElements.define('menu-bar', MenuBar);
