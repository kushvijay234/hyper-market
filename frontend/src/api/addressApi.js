import axios from "axios";

const API_URL = "http://localhost:3000/api/addresses";

export const getAddresses = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateAddress = async (address, token) => {
  // Make sure `address` includes type and name
  const payload = {
    type: address.type,
    name: address.name,
    street: address.street,
    city: address.city,
    state: address.state,
    zip: address.zip,
  };

  const res = await axios.post(API_URL, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // must return { address: ... } from backend
};
