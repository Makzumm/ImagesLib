// import Notiflix from 'notiflix';
import { refs } from './js/vars.js';

const { buttonEl, galleryWrapper, formEl, inputEl } = refs;

const axios = require('axios').default;

export default class FetchImage {
    constructor() {
        this.page = 1;
        this._fetchedData = '';
    }

    async getImage() {

        const API_KEY = '36626377-ec15308a2cdcc9d1051736749';
        const params = new URLSearchParams({
            key: `${API_KEY}`,
            q: `${inputEl.value}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            per_page: 20,
            page: this.page,
        })

        const url = `https://pixabay.com/api/?${params}`;

        const response = await axios.get(url);

        if (response.status === 404) {
            return [];
        }

        return response;
    }

    increasePage() {
        this.page += 1;
    }

    pageToStartPosition() {
        this.page = 1;
    }

    get fetchedData() {
        return this._fetchedData;
    }

    set fetchedData(string) {
        this._fetchedData = string;
    }

}

const fetchImg = new FetchImage()

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    fetchImg.getImage()
        .then(data => createMarkUp(data.data.hits))
        .catch(error => console.log(error))

});

buttonEl.addEventListener('click', (e) => {

    e.preventDefault();

    fetchImg.increasePage()

    fetchImg.getImage()
        .then(data => createMarkUp(data.data.hits))
        .catch(error => console.log(error))
})

function createMarkUp(data) {
    galleryWrapper.innerHTML = data.map((el) => {
        return `
  <img
      class="photo"
      src="${el.webformatURL}"
      loading="lazy"
  />
    `
    }).join('')
}
