const elements = {
  gallery: document.querySelector('.gallery'),
};

function onRenderSearchMarkup(searchValue) {
  const markup = searchValue.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="gallery-wrapper">
      <a href="${largeImageURL}"><div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" height="200" width="300" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${likes}
          </p>
          <p class="info-item">
            <b>Views</b>${views}
          </p>
          <p class="info-item">
            <b>Comments</b>${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${downloads}
          </p>
        </div>
      </div></a></div>`;
      }
    )
    .join('');

  elements.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGalleryContent() {
  elements.gallery.innerHTML = '';
}

export { onRenderSearchMarkup, clearGalleryContent };
