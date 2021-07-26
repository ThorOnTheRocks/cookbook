import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime'


const recipeContainer = document.querySelector('.recipe');

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

const init = () => {
  recipeView.addHandlerRender(controlRecipes)
};

init();