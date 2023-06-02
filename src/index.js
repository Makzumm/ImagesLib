import { refs } from './js/vars.js';
import FetchImage from './js/fetch.js';
import createMarkUp from './js/markup.js';
import upButton from './js/up-button.js';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { debounce } from 'lodash';

const { loadMoreButtonEl, galleryWrapper, formEl, inputEl } = refs;
const fetchImg = new FetchImage()
const DEBOUNCE_DELAY = 200;
const gallerySimpleLightbox = new SimpleLightbox('.gallery a');

inputEl.addEventListener('input', (e) => {
    fetchImg.fetchedData = e.target.value;
})

formEl.addEventListener('submit', onformEl)

async function onformEl(e) {
    e.preventDefault();

    fetchImg.query = e.currentTarget.elements.searchQuery.value.trim();

    fetchImg.pageToStartPosition();

    inputEl.blur()

    if (fetchImg.query === '') {
        Notiflix.Notify.info('Please, type something!');
        e.target.reset();
        clearHTML();
        return
    }

    try {
        const data = await fetchImg.getImage(fetchImg.fetchedData);

        clearHTML();

        if (data.data.hits.length === 0) {
            Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
            loadMoreButtonEl.classList.add('is-hidden');
            clearHTML();
            return;
        }

        Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`);
        galleryWrapper.insertAdjacentHTML('beforeend', createMarkUp(data.data.hits));

        gallerySimpleLightbox.refresh();

    } catch (error) {
        console.log(error)
    }

};

window.addEventListener('scroll', debounce(onScroll, DEBOUNCE_DELAY));

async function onScroll() {
    fetchImg.increasePage();

    let inputVal = inputEl.value.trim();

    if (inputVal === '') {
        return [];
    }

    try {

        const response = await fetchImg.getImage(fetchImg.fetchedData);

        if (fetchImg.page === Math.ceil(response.data.totalHits / 20)) {
            loadMoreButtonEl.classList.add('is-hidden');
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }

        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
            galleryWrapper.insertAdjacentHTML('beforeend', createMarkUp(response.data.hits))
        }

        gallerySimpleLightbox.refresh();

    } catch (error) {
        console.log(error)
    }
}

function clearHTML() {
    galleryWrapper.innerHTML = '';
}

upButton();

//////////// BUTTON

// loadMoreButtonEl.addEventListener('click', onLoadMoreButtonEl);

// async function onLoadMoreButtonEl(e) {
//     fetchImg.increasePage();

//     try {
//         const response = await fetchImg.getImage(fetchImg.fetchedData);

//         if (fetchImg.page === Math.ceil(response.data.total / 20)) {
//             loadMoreButtonEl.classList.add('is-hidden');
//             Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//         }

//         galleryWrapper.insertAdjacentHTML('beforeend', createMarkUp(response.data.hits));

//         new SimpleLightbox('.gallery a', {
//             captionsData: 'alt',
//             captionDelay: 250
//         });

//         SimpleLightbox.refresh();

//     } catch (error) {
//         console.log(error)
//     }
// }

// if (!data.data.hits.length) {
        //     return [];
        // } else {
        //     loadMoreButtonEl.classList.remove('is-hidden');
        // }

        // if (data.data.totalHits <= 20) {
        //     loadMoreButtonEl.classList.add('is-hidden');
        // }