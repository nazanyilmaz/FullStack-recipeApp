const express = require("express");
const cors = require("cors");
const recipeRoutes = require("./routes/recipeRoute");

const app = express();
app.use(express.json()); //istegin body kismina erismemize saglayan middleware
app.use(cors()); //cors hatalarini onleyen middleware
//route tanimi
app.use(recipeRoutes);

//dinlenecek portu belirleme
app.listen(4000, () => {
  console.log("4000 port is running");
});
