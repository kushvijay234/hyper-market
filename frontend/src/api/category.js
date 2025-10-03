import axios from "axios";

const API_URL = "http://localhost:3000/api/category"

const getCategories = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error : "Something went wrong"};
    }
};

export default getCategories;

