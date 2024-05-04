import { createStore } from 'vuex';
import axios from 'axios';
import { addID, uniqueArray, removeUndefined, flattenedArray } from '@/composables/actions';

const store = createStore({
  state() {
    return {
      books: [],
      years: [],
      genres: [],
      main_query: '',
      filtered_books: []
    };
  },
  mutations: {
    setBooks(state, books) {
      state.books = books;
      state.filtered_books = books;
    },
    setYears(state, years) {
      state.years = years;
    },
    setGenres(state, genres) {
      state.genres = genres;
    },
    setSearchQuery(state, query) {
      state.main_query = query;
    },
    setFilteredBooks(state, filteredBooks) {
      state.filtered_books = filteredBooks;
    }
  },
  actions: {
    // filterBooks(state, query) {
    //   return state.filtered_books = state.books.filter((book) => {
    //     return book.title.toLowerCase().includes(query.toLowerCase())
    //   })
    // }
    fetchBooks({ commit, dispatch }) {
      return axios.get('https://freetestapi.com/api/v1/books').then(res => {
        commit('setBooks', res.data)
        dispatch('getYears');
        dispatch('getGenres');
      })
    },
    getYears({ commit, state }) {
      let years = state.books.map(item => item.publication_year);
      years = addID(uniqueArray(removeUndefined(years.sort())));
      commit('setYears', years)
    },
    getGenres({ commit, state }) {
      let genres = state.books.map(item => item.genre);
      genres = flattenedArray(genres);
      genres = addID(uniqueArray(removeUndefined(genres.sort())));
      commit('setGenres', genres)
    },
    filterBooks({ commit }, query) {
      commit('filterBooks', query)
    }
  },
  getters: {
    books: state => state.books,
    years: state => state.years,
    genres: state => state.genres,
    main_query: state => state.main_query,
    filtered_books: state => state.filtered_books
  },
  modules: {
  },
});

export default store;
