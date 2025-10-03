import axios from "axios";

// ✅ Backend URL (Express server, not React)
const BASE_URL = "http://localhost:3000/api/orders";

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
