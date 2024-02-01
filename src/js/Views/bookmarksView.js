import previewView from './previewView.js';
import View from './View.js';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a noce recipe and bookmark it ;)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmarks => previewView.render(bookmarks, false))
      .join();
  }
}

export default new bookmarksView();
