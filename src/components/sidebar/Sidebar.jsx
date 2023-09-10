import React, { useEffect, useState } from "react";
import { categories } from "../../utils/constants";
import { useDispatch } from "react-redux";
import "./sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [categorieName, setCategoriName] = useState("");

  useEffect(() => {
    dispatch({
      type: "typeBtnCategories",
      payload: categorieName,
    });
  }, [dispatch, categorieName]);

  const categorieNameHandler = (event) => {
    setCategoriName(event.target.innerText);
  };

  return (
    <>
      <div className="sidebar">
        {categories.map((categorie, ind) => {
          return (
            <button key={ind} onClick={categorieNameHandler}>
              {categorie.name}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
