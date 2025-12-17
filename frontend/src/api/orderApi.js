import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

// ✅ Backend URL (Express server, not React)
const BASE_URL = `${baseURL}/api/orders`;

// Place a new order
export const placeOrder = async (orderData, token) => {
  try {
    const res = await axios.post(BASE_URL, orderData, {
      headers: { Authorization: `Bearer ${token}` }, // pass JWT
    });
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : { message: "Network error" };
  }
};

// Get orders for logged-in user
export const getUserOrders = async (token) => {
  try {
    const res = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : { message: "Network error" };
  }
};
// Create Payment Intent
export const createPaymentIntent = async (products, token) => {
  try {
    const res = await axios.post(`${baseURL}/api/orders/create-payment-intent`, { products }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : { message: "Network error" };
  }
};
