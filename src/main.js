
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


import { getImagesByQuery } from './js/pixabay-api';
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');

form.addEventListener('submit', handleOnSearch);

function handleOnSearch(event) {
    event.preventDefault();

    const query = input.value.trim();

    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Search field cannot be empty!',
            position: 'topRight',
        });
        return

    }

    clearGallery();
    showLoader();

    
    getImagesByQuery(query)
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.error({
                    title: 'Error',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
                return;
            }
            
            createGallery(data.hits);
        })

        .catch(error => {
            console.error(error);
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong!',
                position: 'topRight',
            });
        })
        
        .finally(() => {
            hideLoader();
        });
}