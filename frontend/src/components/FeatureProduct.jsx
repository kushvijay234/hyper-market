import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import getProduct from "../api/productapi"; 

const FeatureProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProduct();
        // show only first 4 products
        setProducts(data.slice(0, 4)); 
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-white px-6 md:px-24 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureProduct;