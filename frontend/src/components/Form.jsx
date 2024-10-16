import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { toast } from "react-toastify";
import axios from "axios";

const Form = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    //inputlardaki verileri alip bir nesneye donusturur
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());
    //select alanindaki veriyi dataya ekleme
    newRecipe = {
      ...newRecipe,
      ingredients,
      image: `https://picsum.photo/4${Math.floor(Math.random() * 89) + 10}`,
    };

    //API istegi atip newrecipe yi kaydedelim
    axios
      .post("http://127.0.0.1:4000/api/recipes", newRecipe)
      .then(() => {
        toast.success("Recipe is added");
        navigate("/");
      })
      .catch(() => toast.error("Failed"));
    // bildirim gonder
    //anasayfaya yonlendir
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl m-auto mt-36 flex flex-col gap-10"
    >
      <div className="flex flex-col gap-3 ">
        <label className="font-semibold">Recipe Name</label>
        <input
          required
          name="recipeName"
          type="text"
          className="rounded-md p-2 shadow focus:outline-[#fc9642]"
        />
      </div>
      <div className="flex flex-col gap-3 ">
        <label className="font-semibold">Category</label>
        <input
          required
          name="category"
          type="text"
          className="rounded-md p-2 shadow focus:outline-[#fc9642]"
        />
      </div>
      <div className="flex flex-col gap-3 ">
        <label className="font-semibold">Recipe Time</label>
        <input
          required
          name="recipeTime"
          type="number"
          className="rounded-md p-2 shadow focus:outline-[#fc9642]"
        />
      </div>
      <div className="flex flex-col gap-3 ">
        <label className="font-semibold">Ingredients</label>
        <ReactSelect
          required
          isMulti
          onChange={(options) => {
            const refined = options.map((opt) => opt.label);
            setIngredients(refined);
          }}
          className="rounded-md p-2  focus:outline-[#fc9642]"
        />
      </div>
      <div className="flex flex-col gap-3 ">
        <label className="font-semibold">Instructions</label>
        <textarea
          name="instructions"
          className="rounded-md p-2 shadow focus:outline-[#fc9642] min-h-[150px] max-h-[250px]"
        ></textarea>
      </div>
      <div className="flex flex-col gap-3 ">
        <label className="font-semibold">Serving Suggestion</label>
        <textarea
          name="servingSuggestion"
          className="rounded-md p-2 shadow focus:outline-[#fc9642] min-h-[50px] max-h-[50px]"
        ></textarea>
      </div>
      <div className="flex justify-end gap-6">
        <Link
          to={"/"}
          className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-md text-white font-semibold text-lg transition shadow"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="bg-[#fc9642] hover:bg-[#de993f] px-4 py-2 rounded-md text-white font-semibold text-lg transition"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default Form;
