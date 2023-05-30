import Notiflix from 'notiflix';
import { refs } from './js/vars.js';
import FetchImage from './js/fetch.js';
import createMarkUp from './js/markup.js';

const { loadMoreButtonEl, galleryWrapper, formEl, inputEl } = refs;
const fetchImg = new FetchImage()

inputEl.addEventListener('input', (e) => {
    fetchImg.fetchedData = e.target.value;
})

formEl.addEventListener('submit', onformEl)

async function onformEl(e) {
    e.preventDefault();

    fetchImg.pageToStartPosition();

    fetchImg.query = e.currentTarget.elements.searchQuery.value.trim();

    if (fetchImg.query === '') {
        Notiflix.Notify.info('Please, type something!');
        e.target.reset();
        clearHTML();
        returnж
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

        if (data.data.hits.length < 20) {
            return [];
        } else {
            loadMoreButtonEl.classList.remove('is-hidden');
        }

        Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`);
        galleryWrapper.insertAdjacentHTML('beforeend', createMarkUp(data.data.hits));

    } catch (error) {
        console.log(error)
    }

};

loadMoreButtonEl.addEventListener('click', onLoadMoreButtonEl);

async function onLoadMoreButtonEl(e) {
    fetchImg.increasePage();

    try {

        const response = await fetchImg.getImage(fetchImg.fetchedData);

        if (fetchImg.page === Math.ceil(response.data.totalHits / 20)) {
            loadMoreButtonEl.classList.add('is-hidden');
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }

        galleryWrapper.insertAdjacentHTML('beforeend', createMarkUp(response.data.hits));

    } catch (error) {
        console.log(error)
    }
}

function clearHTML() {
    galleryWrapper.innerHTML = '';
}