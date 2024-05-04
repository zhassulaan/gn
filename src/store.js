import { createStore } from 'vuex';
import axios from 'axios';
import { addID, uniqueArray, removeUndefined, flattenedArray } from '@/composables/actions';

const store = createStore({
  state() {
    return {
      books: [],
      years: [],
      genres: [],
      filtered_books: [],
      filtered_years: [],
      filtered_genres: [],
      main_query: '',
      years_query: '',
      genres_query: '',
      selected_years: [],
      selected_genres: [],
      temp_array: []
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
    validationBooks(state, books) {
      state.temp_array = books.filter(book => 
        book.title && book.author && book.publication_year && book.genre
      );
    },
    setFilteredBooks(state, books) {
      state.filtered_books = books;
    },
    getYearsByIds(state, ids) {
      const yearsArray = state.years.filter(year => ids.includes(year.id));
      state.temp_array = yearsArray.map(year => year.value);
    },
    getGenresByIds(state, ids) {
      const genresArray = state.genres.filter(year => ids.includes(year.id));
      state.temp_array = genresArray.map(genre => genre.value);
    },
    setTitleQuery(state, query) {
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
    setSelectedYears(state, selected_years) {
      state.selected_years = selected_years;
    },
    setSelectedGenres(state, selected_genres) {
      state.selected_genres = selected_genres;
    },
    setTempArray(state, temp_array) {
      state.temp_array = temp_array;
    },
    checkboxOperation(state, payload) {
      const { array, id } = payload;
      const index = array.indexOf(id);
      if (index === -1)
        state.temp_array = [...array, id];
      else
        state.temp_array = array.filter(item => item !== id);
    }
  },
  actions: {
    fetchBooks({ commit, dispatch, state }) {
      return axios.get('https://freetestapi.com/api/v1/books').then(res => {
        commit('validationBooks', res.data);
        commit('setBooks', state.temp_array);
        commit('setTempArray', []);
        dispatch('getYears');
        dispatch('getGenres');
      })
    },
    getYears({ commit, state }) {
      let years = state.books.map(item => item.publication_year);
      years = addID(uniqueArray(removeUndefined(years.sort())));
      commit('setYears', years);
    },
    getGenres({ commit, state }) {
      let genres = state.books.map(item => item.genre);
      genres = flattenedArray(genres);
      genres = addID(uniqueArray(removeUndefined(genres.sort())));
      commit('setGenres', genres);
    },
    findByTitle({ commit }, query) {
      commit('setTitleQuery', query);
    },
    findByQuery({ commit }, { query, idx }) {
      if (idx === 1)
        commit('setYearsQuery', query);
      else if (idx === 2)
        commit('setGenresQuery', query);
    },
    select({ commit, state }, { id, idx }) {
      if (idx === 1) {
        const payload = { array: state.selected_years, id };
        commit('checkboxOperation', payload);
        commit('setSelectedYears', state.temp_array);
      } else if (idx === 2) {
        const payload = { array: state.selected_genres, id };
        commit('checkboxOperation', payload);
        commit('setSelectedGenres', state.temp_array);
      }
      commit('setTempArray', []);
    },
    reset({ commit }, { idx }) {
      if (idx === 1)
        commit('setSelectedYears', []);
      else if (idx === 2)
        commit('setSelectedGenres', []);
    },
    filterBooks({ commit, state }) {
      let filteredBooks = state.books;
      if (state.selected_years.length > 0) {
        commit('getYearsByIds', state.selected_years);
        filteredBooks = filteredBooks.filter(book => state.temp_array.includes(book.publication_year));
      }
      if (state.selected_genres.length > 0) {
        commit('getGenresByIds', state.selected_genres);
        filteredBooks = filteredBooks.filter(book => book.genre.some(item => state.temp_array.includes(item)));
      }
      commit('setTempArray', []);
      commit('setFilteredBooks', filteredBooks);
    }
  },
  getters: {
    books: state => state.books,
    years: state => state.years,
    genres: state => state.genres,
    main_query: state => state.main_query,
    years_query: state => state.years_query,
    genres_query: state => state.genres_query,
    filtered_books: state => state.filtered_books,
    filtered_years: state => state.filtered_years,
    filtered_genres: state => state.filtered_genres,
    selected_years: state => state.selected_years,
    selected_genres: state => state.selected_genres,
    temp_array: state => state.temp_array
  },
  modules: {
  },
});

export default store;
