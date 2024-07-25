import React from "react";
import { createContext, useState, useContext } from "react";

const DietContext = createContext();

export const useDiet = () => useContext(DietContext);

export const DietProvider = ({ children }) => {
  const [diets, setDiets] = useState([]);

  const removeDiet = (id) => {
    setDiets((prevDites) =>
      prevDites.filter((diet) => diet.id !== id)
    );
  };

  const updateDiet = (updatedDiet) => {
    setDiets((prevDiets) =>
      prevDiets.map((diet) =>
        diet.id === updatedDiet.id ? updatedDiet : diet
      )
    );
  };

  return (
    <DietContext.Provider value={{ diets, setDiets, removeDiet, updateDiet }}>
      {children}
    </DietContext.Provider>
  );
};
