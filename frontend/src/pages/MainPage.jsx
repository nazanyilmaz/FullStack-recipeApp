import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { api } from "../api";
import { FaSearch } from "react-icons/fa";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";

const MainPage = () => {
  //apiden tarif verilerini alalaim tanstackquery ile
  // const {isLoading, error, data} =  useQuery({
  //   queryKey:["recipes", order, debouncedSearchTerm],
  //   queryFn:() => api.get("/api/recipes").then((res) =>res.data.recipes)
  // })
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300); //inputta arama yaparaken her 300ms bekleme sonrasi istek atar her tus vurusunda deil

  useEffect(() => {
    setIsLoading(true);

    const params = {
      //gonderilecek parametreler
      title: debouncedSearchTerm,
      order: order,
    };

    api
      .get(`/api/recipes`, { params })
      .then((res) => {
        setData(res.data), setError(null);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [debouncedSearchTerm, order]);

  return (
    <main className="flex-1 bg-gray-200 p-3 h-screen overflow-auto">
      <section>
        <div className="bg-white flex gap-3 p-2 rounded-lg overflow-hidden items-center shadow-lg">
          <FaSearch className="text-xl text-[#fc9642]" />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="w-full outline-none"
          />
        </div>
      </section>
      <section className="mt-5">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <>
            <div className="flex justify-between items-center px-3">
              <h1 className=" text-[#fc9642] text-3xl my-5">
                <span className="bg-white text-[fc9642] rounded-xl px-2 mr-3 shadow-md shadow-[#fc9642]">
                  {" "}
                  {data.results}
                </span>
                Recipes Found
              </h1>
              <select
                value={order}
                className="rounded-md p-2"
                onChange={(e) => {
                  setOrder(e.target.value);
                }}
              >
                <option selected disabled>
                  by Time
                </option>
                <option value={"asc"}>Asc.</option>
                <option value={"desc"}>Desc.</option>
              </select>
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.recipes.map((recipe) => (
                <Card key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default MainPage;
