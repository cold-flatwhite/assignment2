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

  const removeActivity = (id) => {
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== id)
    );
  };

  const updateActivity = (updatedActivity) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity, removeActivity, updateActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};
