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
      years_query: '',
      genres_query: '',
      filtered_books: [],
      filtered_years: [],
      filtered_genres: []
    };
  },
  mutations: {
    setBooks(state, books) {
      state.books = books;
      state.filtered_books = books;
    },
    setYears(state, years) {
      state.years = years;
      state.filtered_years = years;
    },
    setGenres(state, genres) {
      state.genres = genres;
      state.filtered_genres = genres;
    },
    setMainQuery(state, query) {
      state.main_query = query;
      state.filtered_books = state.books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
    },
    setYearsQuery(state, query) {
      state.years_query = query;
      state.filtered_years = state.years.filter(year =>
        year.value.toString().toLowerCase().includes(query.toLowerCase())
      );
    },
    setGenresQuery(state, query) {
      state.genres_query = query;
      state.filtered_genres = state.genres.filter(genre =>
        genre.value.toLowerCase().includes(query.toLowerCase())
      );
    },
    setFilteredBooks(state, filteredBooks) {
      state.filtered_books = filteredBooks;
    }
  },
  actions: {
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
      commit('setMainQuery', query);
    },
    findByQuery({ commit }, { query, idx }) {
      if (idx === 1)
        commit('setYearsQuery', query);
      else if (idx === 2)
        commit('setGenresQuery', query);
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
