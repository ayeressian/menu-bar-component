export default /* html */ `
<link rel="stylesheet" type="text/css" href="../node_modules/normalize.css/normalize.css">
<style>
  * {
    font-family: Arial, Helvetica, sans-serif;
    cursor: default;
  }

  .menu_bar {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #d9d9d9;
  }

  .menu_bar > li {
    float: left;
    display: block;
    color: black;
    text-align: center;
    padding: 7px 8px;
    text-decoration: none;
  }

  li:hover {
    background-color: #bfbfbf;
  }

  .dropdown {
    position: fixed;
    top: 50px;
    left: 0;
    display: none;
    background-color: #cfcfcf;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    min-width: 160px;
    padding: 0;
  }

  .dropdown ul {
    padding: 0;
    margin: 0;
  }

  .dropdown li {
    list-style-type: none;
    height: 2em;
    line-height: 2em;
    padding-left: 20px;
    border-bottom: 1px solid #bdbdbd;
  }

  .dropdown li:last-child {
    border-bottom: 0;
  }
</style>

<ul class="menu_bar">
</ul>

<div class="dropdown">
</div>`;