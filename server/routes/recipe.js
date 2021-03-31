const express = require('express');
const router = express.Router();
const recipeController = require('../controller/recipe');
const { auth } = require('../middleware/auth');

// ------------------------
//        Recipe
// ------------------------

router.post('/', auth, recipeController.createRecipe);

// router.get('/', recipeController.getRecipes);

// router.get('/:recipeId', recipeController.getRecipeById);

// router.put('/:recipeId', auth, recipeController.updateRecipe);

// router.delete('/:recipeId', auth, recipeController.deleteRecipe);

module.exports = router;