import React from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ recipe }) => {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="bg-white shadow-xl rounded-lg p-4 flex flex-col gap-4"
    >
      <div className="relative">
        <img
          className="h-[200px] w-full object-cover rounded-lg shadow-md shadow-[#fc9642]"
          src={recipe.image}
        />
        <p className=" absolute bottom-2 left-1 flex bg-white rounded-xl font-semibold items-center gap-2 py-1 px-2 shadow-xl">
          <FaClock className="text-[#fc9642]" />
          <span className="text-[#fc9642]">{recipe.recipeTime} min.</span>
        </p>
      </div>
      <div>
        <h2 className="font-semibold text-lg ">{recipe.recipeName}</h2>
        <p className="text-gray-500">{recipe.category}</p>
      </div>
    </Link>
  );
};

export default Card;
