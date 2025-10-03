import React from "react";
import { useEffect, useState } from "react";
import getCategories from "../api/category";
import { categoryImageMap } from "../utils/categoryImages";

const desiredCategories = ["Electronics", "Fashion", "Home & Kitchen", "Beauty", "Health & Wellness", "Food & Beverage", "Pet Supplies"];

const CategoriesSection = () => {
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await getCategories();
        const selected = allCategories.filter((cat) =>
          desiredCategories.includes(cat.name)
        );
        setFilteredCategories(selected);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <section className="bg-gray-50 px-6 md:px-24 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.name}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={categoryImageMap[cat.name]}
                alt={cat.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-teal-700 font-semibold">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default CategoriesSection;
