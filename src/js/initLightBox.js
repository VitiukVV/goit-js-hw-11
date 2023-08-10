import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
export function initLightBox() {
  const simpleLightBox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    showCounter: false,
    close: false,
  });
  simpleLightBox.refresh();
}
