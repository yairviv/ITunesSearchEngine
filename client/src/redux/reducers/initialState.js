export default {
  songs: [],
  user: '',
  cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {
    items: []
  }
};
