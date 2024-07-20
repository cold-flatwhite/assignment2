import React from "react";
import { createContext, useState, useContext } from "react";

const ActivityContext = createContext();

export const useActivity = () => useContext(ActivityContext);

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([

  ]);
  const addActivity = (activity) => {
    setActivities((preActivitites) => [...preActivitites, activity]);
  };
  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};
