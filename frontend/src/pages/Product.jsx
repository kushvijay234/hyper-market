import React, { useEffect, useState, useContext } from "react";
import getProducts from "../api/productapi";
import getCategories from "../api/category";
import ProductCard from "../components/ProductCard";
import SortDropdown from "../components/SortDropdown";
import { SearchContext } from "../utils/SearchContext";
import { filterAndSortProducts } from "../utils/filterProducts";
import ProductSkeletonCard from "../components/ProductSkeletonCard";

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

  if (loading) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductSkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
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
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Mobile/Tablet Toggle Button */}
      <div className="lg:hidden mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Products</h2>
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="px-4 py-2 bg-teal-700 text-white rounded-lg text-sm font-medium hover:bg-teal-800 transition"
        >
          {isSidebarOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside
          className={`w-full md:w-[250px] lg:w-[200px] shrink-0 transition-all duration-300 ${
            isSidebarOpen ? "block" : "hidden"
          } lg:block`}
        >
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setCurrentPage(1);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full text-left text-sm sm:text-base px-3 py-2 rounded-md transition-all duration-200 ${
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
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-1 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 hidden lg:block">Products</h2>
            <SortDropdown />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 mb-8 flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-teal-700 text-white rounded-lg disabled:opacity-50 hover:bg-teal-800 transition text-sm"
              >
                Prev
              </button>
              <div className="flex space-x-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (pageNum > totalPages) return null;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        currentPage === pageNum
                          ? "bg-teal-900 text-white"
                          : "bg-teal-100 text-teal-900 hover:bg-teal-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-teal-700 text-white rounded-lg disabled:opacity-50 hover:bg-teal-800 transition text-sm"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductList;
