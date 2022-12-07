const API_KEY = '31907236-eb812238183566cc0aa91bf3c';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApiImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImages() {
    console.log(this);
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.incrementPage();
        console.log(data);
        return data.hits;
      });
  }
  //   async fetchImages() {
  //     try {
  //       const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
  //       const response = await fetch(url);
  //       const images = await response.json();
  //       return images;
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  // return await fetch(url)
  //   .then(async response => {
  // if (!response.ok) {
  //   if (response.status === 400) {
  //     Notiflix.Notify.failure(
  //       "We're sorry, but you've reached the end of search results."
  //     );
  //     loadMoreBtn.hide();
  //     return [];
  //   }

  //   throw new Error(response.status);
  // }
  //     return await response.json().then(data => {
  //       this.incrementPage();
  //       return data;
  //     });
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
