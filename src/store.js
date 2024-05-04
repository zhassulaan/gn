import { createStore } from 'vuex';
import axios from 'axios';
import { addID, uniqueArray, removeUndefined, flattenedArray } from '@/composables/actions';

const store = createStore({
  state() {
    return {
      books: [],
      years: [],
      formats: [],
      filtered_books: [],
      filtered_years: [],
      filtered_formats: [],
      main_query: '',
      years_query: '',
      formats_query: '',
      selected_years: [],
      selected_formats: [],
      temp_array: []
    };
  },
  mutations: {
    setBooks(state, books) {
      state.books = books;
      state.filtered_books = books;
    },
    validationBooks(state, books) {
      state.temp_array = books.filter(book => 
        book.title && book.author_name && book.first_publish_year && book.format
      );
    },
    setFilteredBooks(state, books) {
      state.filtered_books = books;
    },
    setYears(state, years) {
      state.years = years;
      state.filtered_years = years;
    },
    setFormats(state, formats) {
      state.formats = formats;
      state.filtered_formats = formats;
    },
    getYearsByIds(state, ids) {
      const yearsArray = state.years.filter(year => ids.includes(year.id));
      state.temp_array = yearsArray.map(year => year.value);
    },
    getFormatsByIds(state, ids) {
      const formatsArray = state.formats.filter(year => ids.includes(year.id));
      state.temp_array = formatsArray.map(format => format.value);
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
    setFormatsQuery(state, query) {
      state.formats_query = query;
      state.filtered_formats = state.formats.filter(format =>
        format.value.toLowerCase().includes(query.toLowerCase())
      );
    },
    setSelectedYears(state, selected_years) {
      state.selected_years = selected_years;
    },
    setSelectedFormats(state, selected_formats) {
      state.selected_formats = selected_formats;
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
      return axios.get('https://openlibrary.org/search.json?q=the+lord+of+the+rings').then(res => {
        commit('validationBooks', res.data.docs);
        commit('setBooks', state.temp_array);
        commit('setTempArray', []);
        dispatch('getYears');
        dispatch('getFormats');
      })
    },
    getYears({ commit, state }) {
      let years = state.books.map(item => item.first_publish_year);
      years = addID(uniqueArray(removeUndefined(years.sort())));
      commit('setYears', years);
    },
    getFormats({ commit, state }) {
      let formats = state.books.map(item => item.format);
      formats = flattenedArray(formats);
      formats = addID(uniqueArray(removeUndefined(formats.sort())));
      commit('setFormats', formats);
    },
    findByTitle({ commit }, query) {
      commit('setTitleQuery', query);
    },
    findByQuery({ commit }, { query, idx }) {
      if (idx === 1)
        commit('setYearsQuery', query);
      else if (idx === 2)
        commit('setFormatsQuery', query);
    },
    select({ commit, state }, { id, idx }) {
      if (idx === 1) {
        const payload = { array: state.selected_years, id };
        commit('checkboxOperation', payload);
        commit('setSelectedYears', state.temp_array);
      } else if (idx === 2) {
        const payload = { array: state.selected_formats, id };
        commit('checkboxOperation', payload);
        commit('setSelectedFormats', state.temp_array);
      }
      commit('setTempArray', []);
    },
    reset({ commit }, { idx }) {
      if (idx === 1)
        commit('setSelectedYears', []);
      else if (idx === 2)
        commit('setSelectedFormats', []);
    },
    filterBooks({ commit, state }) {
      let filteredBooks = state.books;
      if (state.selected_years.length > 0) {
        commit('getYearsByIds', state.selected_years);
        filteredBooks = filteredBooks.filter(book => state.temp_array.includes(book.first_publish_year));
      }
      if (state.selected_formats.length > 0) {
        commit('getFormatsByIds', state.selected_formats);
        filteredBooks = filteredBooks.filter(book => book.format.some(item => state.temp_array.includes(item)));
      }
      commit('setTempArray', []);
      commit('setFilteredBooks', filteredBooks);
    }
  },
  getters: {
    books: state => state.books,
    years: state => state.years,
    formats: state => state.formats,
    filtered_books: state => state.filtered_books,
    filtered_years: state => state.filtered_years,
    filtered_formats: state => state.filtered_formats,
    main_query: state => state.main_query,
    years_query: state => state.years_query,
    formats_query: state => state.formats_query,
    selected_years: state => state.selected_years,
    selected_formats: state => state.selected_formats,
    temp_array: state => state.temp_array
  },
  modules: {
  },
});

export default store;
