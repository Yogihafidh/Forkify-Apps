import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultView from './Views/resultView.js';
import paginationView from './Views/paginationView.js';
import bookmarksView from './Views/bookmarksView.js';
import addRecipeView from './Views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    // 1. Get hash from windows scope
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 2. Update result view to mark selected
    resultView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 3. Rendering Spiner from VIEW
    recipeView.renderSpinner();

    // 4. Loading recipe from MODEL
    await model.loadRecipe(id);

    // 5. Rendering recipe from VIEW
    recipeView.render(model.state.recipe);
  } catch (err) {
    // Render error
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    // 1. Get search query from VIEW
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Loading search result from MODEL
    await model.loadSearchResults(query);

    // 3. Render results
    resultView.render(model.getSearchResultsPage());

    // 4. Render initial pagenation button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
controlSearchResults();

const controlPagination = function (goToPage) {
  // 1. Render results
  resultView.render(model.getSearchResultsPage(goToPage));

  // 2. Render initial pagenation button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1. Update the recipe servings (in state)
  model.updateServings(newServings);

  // 2. Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add or Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2. Update recipe view
  recipeView.update(model.state.recipe);

  // 3. Render Bookmark panel
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Render Spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

// Publis-Subcribe Pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
