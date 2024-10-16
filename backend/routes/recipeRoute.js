const express = require("express");
const { controlId } = require("../middleware");
const {
  getAllRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/recipeController");

//Router:serves.js disinda router olusturmak icin kullanilan bir middlewaredir
const router = express.Router();

//olusturdugumuz router yollarini ve calisacak fonk. tanimlama
router.route("/api/recipes").get(getAllRecipes).post(createRecipe);

router
  .route("/api/recipes/:id")
  .get(controlId, getRecipe)
  .delete(controlId, deleteRecipe)
  .patch(controlId, updateRecipe);

//baska dosyalarda kullanmak uzere export edelim
module.exports = router;
