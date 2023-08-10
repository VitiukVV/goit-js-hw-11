import { searchPhotoApi } from './js/pixabay-api';
import {
  onRenderSearchMarkup,
  clearGalleryContent,
} from './js/RenderSearchMarkup';
import { smoothScroll } from './js/smoothScroll';
import { addHiddenLoadMoreBtn, removeHiddenLoadMoreBtn } from './js/loadMore';
import { initLightBox } from './js/initLightBox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const { searchQuery } = elements.form.elements;

const errorMessage =
  'Sorry, there are no images matching your search query. Please try again.';
const endResult = "We're sorry, but you've reached the end of search results.";
const enterValue = 'Please enter a search value';
let inputValue = null;
let shownPage = 1;
let totalPages = 0;

elements.form.addEventListener('submit', handlerSubmit);
elements.loadMoreBtn.addEventListener('click', handlerOnloadMore);

async function handlerSubmit(event) {
  event.preventDefault();
  inputValue = searchQuery.value.trim();
  shownPage = 1;

  if (!inputValue) {
    return Notify.failure(enterValue);
  }
  addHiddenLoadMoreBtn();

  try {
    const response = await searchPhotoApi(inputValue, shownPage);
    console.log(response);
    if (response.totalHits < 1) {
      return Notify.failure(errorMessage);
    }
    Notify.success(`Hooray! We found ${response.totalHits} images.`);

    clearGalleryContent();
    onRenderSearchMarkup(response);
    setTimeout(smoothScroll, 2000);
    initLightBox();
    totalPages = Math.ceil(response.totalHits / 40);
    if (totalPages > 1) {
      removeHiddenLoadMoreBtn();
    }
  } catch (error) {
    Notify.failure(error.message);
  }
}

async function handlerOnloadMore() {
  addHiddenLoadMoreBtn();

  try {
    shownPage += 1;
    const response = await searchPhotoApi(inputValue, shownPage);

    onRenderSearchMarkup(response);
    setTimeout(smoothScroll, 2000);
    initLightBox();
    removeHiddenLoadMoreBtn();

    if (shownPage === totalPages) {
      addHiddenLoadMoreBtn();
      Notify.failure(endResult);
    }
  } catch (error) {
    Notify.failure(error.message);
  }
}
