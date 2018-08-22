function _getBaseUrl() {
  const current =
    import.meta.url;
  var to = current.lastIndexOf('/');
  return current.substring(0, to);
}

function stringReplaceAll(str, find, replace) {
  find = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return str.replace(new RegExp(find, 'g'), replace);
}

const baseUrl = _getBaseUrl();

const htmlPromise = fetch(`${baseUrl}/template.html`).then((response) => response.text()).
  catch((error) => {
    console.error(error);
  });

class MenuBar extends HTMLElement {
  constructor() {
    super();
    this._baseUrl = _getBaseUrl();
    this._shadowDom = this.attachShadow({
      mode: 'closed'
    });

    htmlPromise.then(html => {
      html = stringReplaceAll(html, '${base}', this._baseUrl);
      this._shadowDom.innerHTML = html;
    });
  }

  set config(config) {
    htmlPromise.then(() => {      
      config.items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = item.title;
        const menuBar = this._shadowDom.querySelector('.menu_bar');
        menuBar.appendChild(li);

        if (item.items != null) {

        }
      });
    });
  }

  connectedCallback() {
    console.log('Custom square element added to page.');
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }
}

customElements.define('menu-bar', MenuBar);
