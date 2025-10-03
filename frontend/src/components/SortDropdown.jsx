import React, { useContext } from "react";
import { SearchContext } from "../utils/SearchContext";

const SortDropdown = () => {
  const { sortOption, setSortOption } = useContext(SearchContext);

  return (
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="border rounded-lg px-2 py-1 text-sm"
    >
      <option value="alphabet">Sort: Alphabet (A-Z)</option>
      <option value="priceLow">Price: Low to High</option>
      <option value="priceHigh">Price: High to Low</option>
      <option value="rating">Rating</option>
    </select>
  );
};

export default SortDropdown;
