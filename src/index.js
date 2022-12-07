import PixabayApiImages from './js/pixabayApiImages';
const API_KEY = '31907236-eb812238183566cc0aa91bf3c';
const BASE_URL = 'https://pixabay.com/api/';

const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
const pixabayApiImages = new PixabayApiImages();
function onSearch(e) {
  e.preventDefault();
  pixabayApiImages.query = e.currentTarget.elements.searchQuery.value;
  pixabayApiImages.resetPage();
  pixabayApiImages.fetchImages().then(renderImagesList);
}
function onLoadMore() {
  pixabayApiImages.fetchImages().then(hits => console.log(hits));
}
function renderImagesList(images) {
  const markup = images
    .map(image => {
      return `<div class="photo-card">
       <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>
        <div class="info">
           <p class="info-item">
    <b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
</p>
            <p class="info-item">
                <b>Views</b> <span class="info-item-api">${image.views}</span>  
            </p>
            <p class="info-item">
                <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
            </p>
            <p class="info-item">
                <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
            </p>
        </div>
    </div>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
