import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '53360647-c263b6c497f5f63021bb419c5';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: PER_PAGE,
        page: page,
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data; 
}