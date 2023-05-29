import Notiflix from 'notiflix';
import { refs } from './js/vars.js';
import FetchImage from './js/fetch.js';
import createMarkUp from './js/markup.js';

const { buttonEl, galleryWrapper, formEl, inputEl } = refs;
const fetchImg = new FetchImage()

inputEl.addEventListener('input', (e) => {
    fetchImg.fetchedData = e.target.value;
})

formEl.addEventListener('submit', onformEl)

async function onformEl(e) {
    e.preventDefault();

    clearHTML()
    fetchImg.pageToStartPosition()

    try {

        if (inputEl.value === '') {
            return Notiflix.Notify.info('Please, type something!');
        }

        const data = await fetchImg.getImage(fetchImg.fetchedData);

        galleryWrapper.insertAdjacentHTML('beforeend', createMarkUp(data.data.hits))

    } catch (error) {
        console.log(error)
    }

};

buttonEl.addEventListener('click', onButtonEl);

async function onButtonEl(e) {
    e.preventDefault();

    try {
        fetchImg.increasePage()

        const moreData = await fetchImg.getImage(fetchImg.fetchedData)

        galleryWrapper.insertAdjacentHTML('beforeend', createMarkUp(moreData.data.hits))

    } catch (error) {
        console.log(error)
    }
}

function clearHTML() {
    galleryWrapper.innerHTML = '';
}