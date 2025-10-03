import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api/auth" });

// Signup
export const signup = (formData) => API.post("/signup", formData);

// Signin
export const signin = (formData) => API.post("/signin", formData);

// Profile (protected)
export const getProfile = (token) =>
  API.get("/profile", { headers: { Authorization: `Bearer ${token}` } });


