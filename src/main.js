
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
    showLoadMoreButton,
    hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const loadMoreButton = document.querySelector('.load-more-btn');

let currentPage = 1;
let currentQuery = "";
const PER_PAGE = 15;

form.addEventListener('submit', handleOnSearch);
loadMoreButton.addEventListener('click', handleOnLoadMore)

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

    currentPage = 1;
    currentQuery = query;


    clearGallery();
    showLoader();
    hideLoadMoreButton();

    
    getImagesByQuery(query, currentPage)
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

            const totalPages = Math.ceil(data.totalHits / PER_PAGE);
            if (currentPage < totalPages) {
                showLoadMoreButton();
            }
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

function handleOnLoadMore() {
    currentPage ++;
    showLoader();
    hideLoadMoreButton();

    getImagesByQuery(currentQuery, currentPage)
        .then(data => {
            createGallery(data.hits);

            const totalPages = Math.ceil(data.totalHits / PER_PAGE);

            if (currentPage >= totalPages) {
                iziToast.info({
                    title: 'Info',
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight',
                });
                hideLoadMoreButton();
            } else {
                showLoadMoreButton();
            }
        })
        .catch(() => {
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong! while loading more images!',
                position: 'topRight',
            });
        })
        .finally(() => {
            hideLoader()
        });
}