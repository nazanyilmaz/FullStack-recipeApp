import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

const UpdatePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState("");
  const [recipeTime, setRecipeTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [servingSuggestion, setServingSuggestion] = useState("");
  const navigate = useNavigate();

  // URL'den düzenlenecek elemanın id'sini al
  const { id } = useParams();

  // API'den düzenlenecek elemanın bilgilerini al
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:4000/api/recipes/${id}`)
      .then((res) => {
        const recipe = res?.data?.recipe;
        setData(recipe);
        setRecipeName(recipe?.recipeName || "");
        setCategory(recipe?.category || "");
        setRecipeTime(recipe?.recipeTime || "");
        setIngredients(recipe?.ingredients || []);
        setInstructions(recipe?.instructions || "");
        setServingSuggestion(recipe?.servingSuggestion || "");
      })
      .catch((err) => setError(err.response?.data?.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  // Güncelleme isteği göndermek için
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      recipeName,
      category,
      recipeTime,
      ingredients,
      instructions,
      servingSuggestion,
    };

    console.log("Sending update data", updatedData);

    axios
      .patch(`http://127.0.0.1:4000/api/recipes/${id}`, updatedData, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
      .then((res) => {
        console.log("update response", res.data);
        toast.info("Recipe is updated");
        navigate(`/recipe/${id}`);
      })
      .catch((err) => {
        console.log("update Error", err);
        toast.error("Update is fail");
      });
  };

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="flex-1 bg-gray-200 p-3 h-screen overflow-auto pt-10">
      <h1 className="text-4xl font-bold text-[#fc9642]">Update Recipe</h1>

      <form
        className="max-w-2xl m-auto mt-20 flex flex-col gap-10"
        onSubmit={handleUpdate}
      >
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Recipe Name</label>
          <input
            defaultValue={recipeName}
            required
            name="recipeName"
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className="rounded-md p-2 shadow focus:outline-[#fc9642]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Category</label>
          <input
            required
            name="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md p-2 shadow focus:outline-[#fc9642]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Recipe Time(min.)</label>
          <input
            required
            name="recipeTime"
            type="number"
            value={recipeTime}
            onChange={(e) => setRecipeTime(e.target.value)}
            className="rounded-md p-2 shadow focus:outline-[#fc9642]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Ingredients</label>
          <ReactSelect
            required
            isMulti
            value={ingredients.map((ingredient) => ({
              label: ingredient,
              value: ingredient,
            }))}
            onChange={(options) => {
              const refined = options.map((opt) => opt.label);
              setIngredients(refined);
            }}
            className="rounded-md p-2 focus:outline-[#fc9642]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Instructions</label>
          <textarea
            name="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="rounded-md p-2 shadow focus:outline-[#fc9642] min-h-[150px] max-h-[250px]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Serving Suggestion</label>
          <textarea
            name="servingSuggestion"
            value={servingSuggestion}
            onChange={(e) => setServingSuggestion(e.target.value)}
            className="rounded-md p-2 shadow focus:outline-[#fc9642] min-h-[50px] max-h-[50px]"
          />
        </div>
        <div className="flex justify-end gap-6">
          <Link
            to={"/"}
            className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-md text-white font-semibold text-lg transition shadow"
          >
            İptal
          </Link>
          <button
            type="submit"
            className="bg-[#fc9642] hover:bg-[#de993f] px-4 py-2 rounded-md text-white font-semibold text-lg transition"
          >
            Güncelle
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;
