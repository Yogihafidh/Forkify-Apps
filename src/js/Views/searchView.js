import View from './View.js';

class searchView extends View {
  _parentElement = document.querySelector('.search');

  // Get value from DOM
  getQuery() {
    // 1. Get query
    const query = this._parentElement.querySelector('.search__field').value;

    // 2. Clear input field
    this._clearInput();

    // 3. Meneruskan query
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  // Publisher Submit event
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new searchView();
