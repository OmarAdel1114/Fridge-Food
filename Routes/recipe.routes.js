const express = require("express");
const router = express.Router();
const recipeController = require("../Controllers/recipe.controller");
const { validationSchema } = require("../Middleware/ValidationSchema");
const verifyToken = require("../Middleware/verifyToken");
const userRoles = require("../utils/userRoles");
const allowedTo = require("../Middleware/allowedTo");


router
  .route("/")
  .get(verifyToken, recipeController.getAllRecipes)
  .post(validationSchema(), recipeController.addRecipe);

router
  .route("/:recipeId")
  .get(recipeController.getSingleRecipe)
  .patch(recipeController.updateRecipe)
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANAGER),
    recipeController.deleteRecipe
  );

module.exports = router;
