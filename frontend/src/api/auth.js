import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const API = axios.create({ baseURL: `${baseURL}/api/auth` });

// Signup
export const signup = (formData) => API.post("/signup", formData);

// Signin
export const signin = (formData) => API.post("/signin", formData);

// Profile (protected)
export const getProfile = (token) =>
  API.get("/profile", { headers: { Authorization: `Bearer ${token}` } });

// Google Signin
export const googleSignin = (token) => API.post("/google", { token });


