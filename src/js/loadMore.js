const elements = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
function addHiddenLoadMoreBtn() {
  elements.loadMoreBtn.classList.add('is-hidden');
}
function removeHiddenLoadMoreBtn() {
  elements.loadMoreBtn.classList.remove('is-hidden');
}

export { addHiddenLoadMoreBtn, removeHiddenLoadMoreBtn };
