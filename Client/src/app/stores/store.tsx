import { createContext, useContext } from "react";
import { uiStore } from "./uiStore";
import { ActivityStore } from "./activityStore";

interface Store {
  uiStoreInstance: uiStore;
  activityStoreInstance: ActivityStore;
}

const UIContext = createContext<Store | undefined>(undefined);

export const CounterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const uiStoreInstance = new uiStore();
  const activityStoreInstance = new ActivityStore();

  return (
    <UIContext.Provider value={{ uiStoreInstance, activityStoreInstance }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUIContext must be used within a UIContext");
  }
  return context;
};
