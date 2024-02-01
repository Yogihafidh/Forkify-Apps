import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { AJAX } from './helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    // 1. Get API
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    // 2. Passing data and Formating Objek

    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    // Temp Error Handling
    console.error(err);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    // 1. Get Query Search
    state.search.query = query;

    // 2. Get Data API
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data);

    // 3. Passing data to state and Formating Objek
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });

    state.search.page = 1;
  } catch (err) {
    // Temp Error Handling
    console.error(err);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  // Logic about pagenation
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // newQuantity = (oldQuantity * newServings)/oldServings | exp => (2 * 8)/4 = 4
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

// BOOKMARK LOGIC
const persistBookmark = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // 1. Add Bookmark
  state.bookmarks.push(recipe);

  // 2. Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmark();
};

export const deleteBookmark = function (id) {
  // 1. Delete bookmark in id with index
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // 2. Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmark();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient fromat! please use the correct format'
          );

        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? Number(quantity) : null,
          unit,
          description,
        };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: Number(newRecipe.cookingTime),
      servings: Number(newRecipe.servings),
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  const storage = localStorage.getItem('bookmark');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
