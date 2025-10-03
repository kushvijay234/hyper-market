// src/api/getProductsByCategory.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/product";

const getProductsByCategory = async (categoryName) => {
  try {
    const response = await axios.get(`${API_URL}?category=${encodeURIComponent(categoryName)}`);
    const data = response.data;

    return Array.isArray(data) ? data : data.products || [];
  } catch (error) {
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export default getProductsByCategory;