import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '53360647-c263b6c497f5f63021bb419c5';

export function getImagesByQuery(query) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    };

    return axios
        .get(BASE_URL, { params })
        .then(responce => responce.data); 
}