import { createStore } from 'vuex';

export default createStore({
  state: {
    counter: 'dqwdw',
    selectedYears: [],
    selectedFormats: []
  },
  mutations: {
    toggleYear(state, yearId) {
      const index = state.selectedYears.indexOf(yearId);
      if (index === -1) {
        state.selectedYears.push(yearId);
      } else {
        state.selectedYears.splice(index, 1);
      }
    },
    toggleFormat(state, formatId) {
      const index = state.selectedFormats.indexOf(formatId);
      if (index === -1) {
        state.selectedFormats.push(formatId);
      } else {
        state.selectedFormats.splice(index, 1);
      }
    },
    resetYear(state) {
      state.selectedYears = [];
    },
    resetFormat(state) {
      state.selectedFormats = [];
    }
  },
  actions: {
  },
  getters: {
  },
  modules: {
  },
});
