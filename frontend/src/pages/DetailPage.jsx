import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaClock, FaTrashAlt, FaRegEdit } from "react-icons/fa";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { toast } from "react-toastify";

const DetailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:4000/api/recipes/${id}`)
      .then((res) => setData(res?.data?.recipe))
      .catch((err) => setError(err.response.data.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = () => {
    if (confirm("Are You Sure?")) {
      axios
        .delete(`http://127.0.0.1:4000/api/recipes/${id}`)
        .then(() => {
          toast.info("Recipe is Deleted");
          navigate("/");
        })
        .catch(() => {
          toast.error("Deleted is fail");
        });
    }
  };

  //console.log(data);

  return (
    <div className="flex-1 bg-gray-200 p-5">
      <div className="flex justify-center gap-3">
        <Link
          onClick={handleDelete}
          className="ml-[600px] mt-4 bg-[#f93702] text-white flex flex-row gap-3 p-3 justify-center items-center rounded-lg hover:bg-[#fe592b]"
        >
          <FaTrashAlt size={25} />
        </Link>
        <Link
          to={`/update/${data?.id}`}
          className="mt-4 bg-[#387ae4] text-white flex flex-row gap-3 p-3 justify-center items-center rounded-lg hover:bg-[#359ae2]"
        >
          <FaRegEdit size={25} />
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div className=" max-w-5xl m-auto my-3 flex flex-col gap-10">
          <h1 className="text-3xl font-bold">{data.recipeName}</h1>
          <div className="flex gap-3">
            <span className="bg-[#fc9642] p-2 rounded-lg text-white font-semibold">
              {data.category}
            </span>
            <span className="bg-[#fc9642] p-2 rounded-lg text-white flex flex-row justify-center items-center gap-3 font-semibold">
              <FaClock className="text-white" />
              {data.recipeTime} minutes
            </span>
          </div>

          <img src={data?.image} className="rounded-lg max-h-[400px] p-5 " />
          <div className="px-5">
            <h1 className="font-bold text-2xl  mb-2 text-[#fc9642]">
              Ingredients
            </h1>
            <ul className="font-semibold text-lg text-gray-600">
              {data.ingredients.map((ingredient, key) => (
                <li key={key} className="">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-5">
            <h1 className="font-bold text-xl  mb-2 text-[#fc9642]">
              Instruction
            </h1>
            <p className="font-semibold text-lg text-gray-600">
              {data.instructions}
            </p>
          </div>
          <div className="px-5">
            <h1 className="text-2xl font-bold mb-2 text-[#fc9642]">
              Serving Suggestion
            </h1>
            <p className="font-semibold text-lg text-gray-600">
              {data.servingSuggestion}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
