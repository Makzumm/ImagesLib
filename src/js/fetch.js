const axios = require('axios').default;

export default class FetchImage {
    constructor() {
        this.page = 1;
        this._searchQuery = '';
    }

    async getImage(element) {

        const API_KEY = '36626377-ec15308a2cdcc9d1051736749';
        const params = new URLSearchParams({
            key: `${API_KEY}`,
            q: `${element}`,
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
        return this._searchQuery;
    }

    set fetchedData(string) {
        this._searchQuery = string;
    }

}