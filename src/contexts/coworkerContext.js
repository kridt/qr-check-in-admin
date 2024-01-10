import React, { createContext, useState } from "react";

// Create the coworker ID context
export const CoworkerIdContext = createContext();

// Create the coworker ID provider component
export const CoworkerIdProvider = ({ children }) => {
  const [coworkerId, setCoworkerId] = useState(false);

  return (
    <CoworkerIdContext.Provider value={{ coworkerId, setCoworkerId }}>
      {children}
    </CoworkerIdContext.Provider>
  );
};
