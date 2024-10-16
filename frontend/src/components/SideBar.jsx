import React from "react";
import { Link, NavLink } from "react-router-dom";
import { IoHomeSharp, IoSettings } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaCompass } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className="flex flex-col h-screen justify-between items-center p-3 max-md:p-2 max-md:justify-normal max-md:gap-20 lg:p-10">
      <NavLink to={"/"}>
        <img src="/recipe_logo.jpg" className="w-[150px] max-md:w-[90px] " />
      </NavLink>

      <div className="flex flex-col gap-20 ">
        <NavLink
          to={"/"}
          className="flex gap-4 items-center text-xl text-gray-400"
        >
          <IoHomeSharp className="max-md:text-2xl" />
          <span className="max-md:hidden">Home</span>
        </NavLink>
        <NavLink
          to={"/add"}
          className="flex gap-4 items-center text-xl text-gray-400"
        >
          <MdOutlinePostAdd className="max-md:text-3xl" />
          <span className="max-md:hidden">Add Recipe</span>
        </NavLink>

        <NavLink
          to={"/discover"}
          className="flex gap-4 items-center text-xl text-gray-400"
        >
          <FaCompass className="max-md:text-2xl" />
          <span className="max-md:hidden">Explore</span>
        </NavLink>
        <NavLink
          to={"/likes"}
          className="flex gap-4 items-center text-xl text-gray-400"
        >
          <FaHeart className="max-md:text-2xl" />
          <span className="max-md:hidden">Favorites</span>
        </NavLink>
        <NavLink
          to={"/settings"}
          className="flex gap-4 items-center text-xl text-gray-400"
        >
          <IoSettings className="max-md:text-2xl" />
          <span className="max-md:hidden">Settings</span>
        </NavLink>
      </div>
      <div className="ms-2 flex flex-col gap-2 max-md:hidden">
        <p className=" text-[#fc9642]">Discover Daily Recipes</p>
        <button className="bg-[#f93702] rounded-full text-white text-bold p-0.5 hover:bg-[#f5a768]">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SideBar;
