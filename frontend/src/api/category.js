import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

const API_URL = `${baseURL}/api/category`;

const getCategories = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error : "Something went wrong"};
    }
};

export default getCategories;

