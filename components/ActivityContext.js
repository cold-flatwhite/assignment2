import React from "react";
import { createContext, useState, useContext } from "react";

const ActivityContext = createContext();

export const useActivity = () => useContext(ActivityContext);

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      itemType: "Walking",
      data: "30 min",
      date: "Mon Jul 15 2024",
      special: false,
    },
  ]);
  const addActivity = (activity) => {
    setActivities((preActivitites) => [...preActivitites, activity]);
  };
  return (
    <ActivityContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivityContext.Provider>
  );
};
