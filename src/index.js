import { searchPhotoApi } from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const { searchQuery } = elements.form.elements;

const errorMessage =
  'Sorry, there are no images matching your search query. Please try again.';
let inputValue = null;
let shownPage = 1;
let totalPages = 0;

elements.form.addEventListener('submit', handlerSubmit);
elements.loadMoreBtn.addEventListener('click', handlerOnloadMore);

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  showCounter: false,
  close: false,
});

async function handlerSubmit(event) {
  event.preventDefault();
  inputValue = searchQuery.value.trim();
  shownPage = 1;

  if (!inputValue) {
    return Notify.failure('Please enter a search value');
  }
  elements.loadMoreBtn.classList.add('is-hidden');

  try {
    const response = await searchPhotoApi(inputValue, shownPage);

    if (response.totalHits < 1) {
      return Notify.failure(errorMessage);
    }
    Notify.success(`Hooray! We found ${response.totalHits} images.`);

    elements.gallery.innerHTML = '';
    onRenderSearchMarkup(response);
    setTimeout(smoothScroll, 3000);
    simpleLightBox.refresh();
    elements.loadMoreBtn.classList.remove('is-hidden');
    totalPages = Math.ceil(response.totalHits / 40);
  } catch (error) {
    Notify.failure(error.message);
  }
}

async function handlerOnloadMore() {
  elements.loadMoreBtn.classList.add('is-hidden');

  try {
    shownPage += 1;
    const response = await searchPhotoApi(inputValue, shownPage);

    onRenderSearchMarkup(response);
    setTimeout(smoothScroll, 2000);
    simpleLightBox.refresh();

    elements.loadMoreBtn.classList.remove('is-hidden');

    if (shownPage === totalPages) {
      elements.loadMoreBtn.classList.add('is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    Notify.failure(error.message);
  }
}

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

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
