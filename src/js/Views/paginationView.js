import icons from 'url:../../img/icons.svg';
import View from './View.js';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    // 1. Calc number of pages
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // 2. Condition page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this.generateNextBtn(curPage);
    }

    // 3. Condition last pages
    if (curPage === numPages && numPages > 1) {
      return this.generatePrevBtn(curPage);
    }

    // 4. Condition other pages
    if (curPage < numPages) {
      return [this.generateNextBtn(curPage), this.generatePrevBtn(curPage)];
    }

    // 5. Condition page 1 and there are No other pages
    return '';
  }

  generateNextBtn(curPage) {
    return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  generatePrevBtn(curPage) {
    return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;
  }
}

export default new paginationView();
