export default function createMarkUp(data) {
    const HTMLMarkUp = data.map((el) => {
        return `
        <div class="photo-card">
            <a class="gallery__item" href="${el.largeImageURL}">
                    <img
                    class="photo"
                    src="${el.webformatURL}"
                    loading="lazy"
                    alt="${el.tags}"
                />
            </a>
            <div class="info">
                <p class="info-item">
                <b>Likes: ${el.likes}</b>
                </p>
                <p class="info-item">
                <b>Views: ${el.views}</b>
                </p>
                <p class="info-item">
                <b>Comments : ${el.comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads : ${el.downloads}</b>
                </p>
            </div>
        </div>
    `
    }).join('')

    return HTMLMarkUp;
}

