import React from "react";
import { createContext, useState, useContext } from "react";

const DietContext = createContext();

export const useDiet = () => useContext(DietContext);

export const DietProvider = ({ children }) => {
  const [diets, setDiets] = useState([]);

  const addDiet = (diet) => {
    setDiets((prevDiets) => [...prevDiets, diet]);
  };

  return (
    <DietContext.Provider value={{ diets, addDiet }}>
      {children}
    </DietContext.Provider>
  );
};
