const crypto = require("crypto");
const { getData } = require("../utils/getData");
const { setData } = require("../utils/setData");

let data = getData();

//All recipes
exports.getAllRecipes = (req, res) => {
  let recipes = [...data];
  const searchTerm = req.query?.title?.trim()?.toLowerCase(); //aratilan terim
  const order = req.query.order; //siralama  parametrisine eris

  // aratilan terim varsa filtreli sonuc yoksa hepsini gonder
  if (searchTerm) {
    recipes = data.filter((recipe) =>
      recipe.recipeName?.toLowerCase().includes(searchTerm)
    );
  }
  //eger order varsa siralayip gonder
  if (order) {
    recipes.sort((a, b) =>
      order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }
  //cevap gonder
  res.status(200).json({
    message: "All recipes have been successfully sent.",
    results: recipes.length,
    recipes: recipes,
  });
};

// a recipe
exports.getRecipe = (req, res) => {
  res.status(200).json({
    message: "A Recipe was taken",
    recipe: req.recipe,
  });
};

//create recipe
exports.createRecipe = (req, res) => {
  //1)istegin body kismi ile gelen veriye eriselim
  let newRecipe = req.body;
  //2)gelen verinin tum degerleri tanimlanmismi diye kontrol edelim
  if (
    !newRecipe.recipeName ||
    !newRecipe.recipeTime ||
    !newRecipe.category ||
    !newRecipe.ingredients ||
    !newRecipe.instructions ||
    !newRecipe.image
  ) {
    return res.status(400).json({
      message: "Please add all values",
    });
  }
  //3)veriye ID and image ekleyelim
  newRecipe = {
    ...newRecipe,
    id: crypto.randomUUID(),
    image:
      "https://poshplate.us/wp-content/uploads/2021/07/Turkish-Cucumber-Dip-500x375.jpg",
  };

  //4)diziyi update edelim yyani yeni tarifi diziye ekleyelim
  data.push(newRecipe);
  //5)yeni diziye JSON dosyasina  yazma
  setData(data);
  //6) cevap gonder
  res.status(201).json({ message: "New Recipe Created", recipe: data });
};

//delete recipe
exports.deleteRecipe = (req, res) => {
  //silinecek elemnain sirasini bul
  const index = data.findIndex((i) => i.id == req.params.id);
  //id si ve sirasi bilinne elemnai sil. yani sirasi index olan 1 tane elemani kaldir demis oluyoruz.
  data.splice(index, 1);
  //json guncelle
  setData(data);
  //cevap gonder
  res.status(200).json({
    message: "Recipe is Deleted",
  });
};
//update recipe
exports.updateRecipe = (req, res) => {
  // tarif nesnesini guncelle
  const updated = { ...req.recipe, ...req.body };
  //guncellenecek olacak elemanin sirasini bul
  const index = data.findIndex((i) => i.id == req.params.id);
  //diziyi guncelle
  data.splice(index, 1, updated);
  //JSON dosyasini guncelle
  setData(data);
  //client'q cevap gonder
  res.status(200).json({
    message: "Recipe is updated",
    recipe: updated,
  });
};
