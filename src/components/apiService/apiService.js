import axios from "axios";

// путь к API - эндпоинт, базовый URL, точка входа в API.
const BASE_URL = 'https://pixabay.com/api/';
        // Ключ API
const API_KEY = 'key=25666738-83e6abd6c600844fdf6c33b5c';
        
async function apiService(query, page) {
    const response = await axios.get(`${BASE_URL}?q=${query}&page=${page}&${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`); // запрос через библ. axios
    return response;
}

export { apiService };