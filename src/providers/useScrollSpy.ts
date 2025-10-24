import { useContext } from "react";

import { ScrollSpyContext } from "./scrollSpyContext";

export const useScrollSpy = () => {
  const context = useContext(ScrollSpyContext);

  if (!context) {
    throw new Error("useScrollSpy must be used within ScrollSpyProvider");
  }

  return context;
};

