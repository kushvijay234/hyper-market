export const filterAndSortProducts = (products, searchTerm, sortOption) => {
  // 🔍 filter by search
  let filtered = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔀 sort
  filtered = [...filtered].sort((a, b) => {
    switch (sortOption) {
      case "priceLow":
        return a.price - b.price;
      case "priceHigh":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "alphabet":
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return filtered;
};
