import React from "react";
import { createContext, useState } from "react";

interface ActivityContextType {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined
);

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <ActivityContext.Provider value={{ editMode, setEditMode }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => {
  const context = React.useContext(ActivityContext);
  if (context === undefined) {
    throw new Error(
      "useActivityContext must be used within a ActivityProvider"
    );
  }
  return context;
};
