const API_KEY = '31907236-eb812238183566cc0aa91bf3c';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApiImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchImages() {
    console.log(this);
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    const response = await fetch(url);
    const data = await response.json();
    this.incrementPage();
    console.log(data.hits);
    return data;
  }
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
