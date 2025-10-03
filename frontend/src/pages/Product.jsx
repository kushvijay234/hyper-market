import React, { useEffect, useState, useContext } from "react";
import getProducts from "../api/productapi";
import getCategories from "../api/category";
import ProductCard from "../components/ProductCard";
import SortDropdown from "../components/SortDropdown";
import { SearchContext } from "../utils/SearchContext";
import { filterAndSortProducts } from "../utils/filterProducts";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ name: "All" }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { searchTerm, sortOption } = useContext(SearchContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productData);
        setCategories([{ name: "All" }, ...categoryData]);
      } catch (err) {
        setError(err.error || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading products...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  // ✅ Fixed filtering logic for populated category objects
  const filteredProducts = filterAndSortProducts(products, searchTerm, sortOption).filter(
    (product) =>
      selectedCategory === "All" ||
      (Array.isArray(product.category) &&
        product.category.some(
          (cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase()
        ))
  );

  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="mt-16 p-6">
      {/* Mobile Toggle Button */}
      <div className="md:hidden mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Products</h2>
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="px-3 py-1 bg-teal-700 text-white rounded"
        >
          {isSidebarOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside
          className={`w-full md:w-[180px] shrink-0 transition-all duration-300 ${
            isSidebarOpen ? "block" : "hidden"
          } md:block`}
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Categories</h3>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.name}>
                <button
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setCurrentPage(1);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left text-base px-3 py-2 rounded-md transition-all duration-200 ${
                    selectedCategory === cat.name
                      ? "bg-teal-700 text-white shadow-sm"
                      : "text-gray-700 hover:bg-teal-100 hover:text-teal-800"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <section className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold hidden md:block">Products</h2>
            <SortDropdown />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-teal-700 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-teal-900 text-white"
                    : "bg-teal-100 text-teal-900"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-teal-700 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductList;
