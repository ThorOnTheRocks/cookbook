import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

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
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err)
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();