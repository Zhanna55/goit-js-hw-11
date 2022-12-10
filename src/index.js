import PixabayApiImages from './js/pixabayApiImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/style.css';
const API_KEY = '31907236-eb812238183566cc0aa91bf3c';
const BASE_URL = 'https://pixabay.com/api/';

const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
  endCollection: document.querySelector('.end-collection'),
};
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', fetchImagesList);
const pixabayApiImages = new PixabayApiImages();
refs.loadMoreBtn.classList.add('is-hidden');
refs.endCollection.classList.add('is-hidden');

function onSearch(e) {
  e.preventDefault();
  clearImageGallery();
  refs.endCollection.classList.add('is-hidden');
  pixabayApiImages.query = e.currentTarget.elements.searchQuery.value.trim();
  pixabayApiImages.resetPage();
  if (pixabayApiImages.query === '') {
    return;
  }
  fetchImagesList();
}
async function fetchImagesList() {
  try {
    const gallery = await pixabayApiImages.fetchImages().then(data => {
      console.log(data.hits);
      if (data.hits.length === 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderImagesList(data.hits);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        if (data.hits.length >= 40) {
          refs.loadMoreBtn.classList.remove('is-hidden');
        } else if (data.hits.length < 40) {
          refs.loadMoreBtn.classList.add('is-hidden');
          refs.endCollection.classList.remove('is-hidden');
        }

        gallerySimpleLightbox.refresh();
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function renderImagesList(hits) {
  const markup = hits
    .map(hit => {
      return `<div class="photo-card">
       <a href="${hit.largeImageURL}"><img class="photo" src="${hit.webformatURL}" alt="${hit.tags}" title="${hit.tags}" loading="lazy"/></a>
        <div class="info">
           <p class="info-item">
    <b>Likes</b> <span class="info-item-api"> ${hit.likes} </span>
</p>
            <p class="info-item">
                <b>Views</b> <span class="info-item-api">${hit.views}</span>  
            </p>
            <p class="info-item">
                <b>Comments</b> <span class="info-item-api">${hit.comments}</span>  
            </p>
            <p class="info-item">
                <b>Downloads</b> <span class="info-item-api">${hit.downloads}</span> 
            </p>
        </div>
    </div>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  scrollPage();
}
function clearImageGallery() {
  refs.gallery.innerHTML = '';
}
function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 8,
    behavior: 'smooth',
  });
}
