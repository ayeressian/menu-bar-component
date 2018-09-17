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

    if (item.items != null) {
      this._dropDown.style.display = 'inline-block';
      this._dropDown.style.top = viewportOffset.bottom + 'px';
      this._dropDown.style.left = viewportOffset.left + 'px';
      this._dropDown.innerHTML = '';
      const ulElem = document.createElement('ul');
      item.items.forEach((innerItem) => {
        const li = document.createElement('li');
        li.innerHTML = innerItem.title;
        li.addEventListener('click', () => {
          this._onItemClick(innerItem);
          this._dropDown.style.display = 'none';
        });
        ulElem.appendChild(li);
      });
      this._dropDown.appendChild(ulElem);
    } else {
      this._dropDown.style.display = 'none';
    }
  }

  _onItemClick(item, event) {
    this.dispatchEvent(new CustomEvent('select', {
      detail: item.id
    }));
  }

  _createItem(item) {
    const li = document.createElement('li');
    li.addEventListener('click', this._onClick.bind(this, item));
    li.innerHTML = item.title;
    const menuBar = this._shadowDom.querySelector('.menu-bar');
    menuBar.appendChild(li);

    li.addEventListener('click', this._onItemClick.bind(this, item));

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
    return li;
  }

  set config(config) {
    config.items.forEach(this._createItem.bind(this));
    if (config.rightItems) {
      config.rightItems.forEach((rightItem) => {
        const li = this._createItem(rightItem);
        li.classList.add('right-menu-item');
      });
    }
  }
}

customElements.define('menu-bar', MenuBar);
