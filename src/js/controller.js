import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //Update results view to mark selected results
    resultsView.update(model.getSearchResultPage());

    // Update bookmarks view
    bookmarksView.update(model.state.bookmarks)


    //Loading Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //Rendering Recipe
    recipeView.render(model.state.recipe);



  } catch (err) {
    console.log(err);
    recipeView.renderError()
  }
};

const controlSearchResults = async () => {
  try {

    resultsView.renderSpinner();
    // Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query)

    // Render results
    resultsView.render(model.getSearchResultPage(6));

    // Render initial pagination buttons
    paginationView.render(model.state.search)
  } catch (err) {
    console.log(err)
  }
};

const controlPagination = (goToPage) => {
  // Render New results
  resultsView.render(model.getSearchResultPage(goToPage));

  // Render New pagination buttons
  paginationView.render(model.state.search)
}

const controlServings = (newServings) => {
  // Update the recipe servings (in state)
  model.updateServings(newServings)

  // Update the recipe view
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = () => {
  // Add or remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks)

}

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks)
}

const init = () => {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  controlServings();
};

init();