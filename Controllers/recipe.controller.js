const { validationResult } = require("express-validator");
const Recipe = require("../Models/recipe.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../Middleware/asyncWrapper");
const appError = require("../utils/appError");

const getAllRecipes = asyncWrapper(async (req, res, next) => {
  const query = req.query; // these 4 lines are for     , these are called Pagination
  const limit = query.limit || 8; // managing the data that
  const page = query.page || 1; // will show in the screen of the frontend
  const skip = (page - 1) * limit; // the eqn ex.if you want page no.2 with limit = 2 : (2 - 1) * 2 = 2

  const recipes = await Recipe.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { recipes } }); //We use status & data to follow Jsend rules in writing
});

const getSingleRecipe = asyncWrapper(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.recipeId);
  if (!recipe) {
    const error = appError.creat("Recipe not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.json({ status: httpStatusText.SUCCESS, data: { recipe } });
});

const addRecipe = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.creat(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }
  const newRecipe = new Recipe(req.body);
  await newRecipe.save();

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { recipe: newRecipe } });
});

const updateRecipe = asyncWrapper(async (req, res, next) => {
  recipeId = req.params.recipeId;
  const updatedrecipe = await Recipe.updateOne(
    { _id: recipeId },
    { $set: { ...req.body } }
  );
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { recipe: updatedrecipe } });
});

const deleteRecipe = asyncWrapper(async (req, res, next) => {
  await Recipe.deleteOne({ _id: req.params.recipeId });
  res.json({ status: httpStatusText.SUCCESS, data: null });
});
module.exports = {
  getAllRecipes,
  getSingleRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
