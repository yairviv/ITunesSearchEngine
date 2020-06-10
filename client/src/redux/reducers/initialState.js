export default {
  songs: [],
  user: '',
  cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {
    items: []
  },
  settings: {
    limit: 25,
    entity: undefined
  }
};
