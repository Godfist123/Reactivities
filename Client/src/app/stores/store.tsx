import { createContext, useContext } from "react";
import { uiStore } from "./uiStore";

interface Store {
  uiStoreInstance: uiStore;
}

const UIContext = createContext<Store | undefined>(undefined);

export const CounterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const uiStoreInstance = new uiStore();
  return (
    <UIContext.Provider value={{ uiStoreInstance }}>
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
