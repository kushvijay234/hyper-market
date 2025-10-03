// src/context/SearchContext.jsx
import React from "react";
import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("alphabet"); // default sort


  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, sortOption, setSortOption }}>
      {children}
    </SearchContext.Provider>
  );
};
