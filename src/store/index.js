import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    guests: ['Иван', 'Кирилл', 'Вера', 'Женя', 'Саша', 'Сережа'],
    foods: ['Лапша', 'Картошка', 'Мясо', 'Яйца', 'Вода'],
    prices: [215, 420, 83, 116, 392],
    buttFoodGuest: [[0, 0], [0, 2], [0, 4], [0, 5], [1, 1], [1, 3], [1, 4], [2, 0], [2, 1], [2, 2], [3, 1], [3, 3], [4, 2], [4, 3], [4, 4], [3, 2]],
    flagGo: 0,
    flagSent: false,
    selectedBuyMan: ['Иван', 'Вера', 'Вера', 'Саша', 'Кирилл'],
    whoEatFood: [[0, 2, 4, 5], [1, 3, 4], [0, 1, 2], [1, 2, 3], [2, 3]],
    personButtons: {},
    marksForPersonButtons: {},
    finalList: [],
    finalList2: [],
    style: 2,
    isPlaying: false,
    currentVolume: ''
  },
  mutations: {
    SET_FLAG_GO(state, flagGo) {
      state.flagGo = flagGo;
    },
    ADD_MEMBER(state) {
      state.guests.push('');
    },
    ADD_FOOD(state) {
      state.foods.push('');
      state.prices.push('');
    },
    DELETE_MEMBER(state, index) {
      state.guests.splice(index, 1);
    },
    DELETE_FOOD(state, index) {
      state.foods.splice(index, 1);
      state.prices.splice(index, 1);
    },
    SET_PERSON_BUTTONS(state, { index, value }) {
      Vue.set(state.personButtons, index, value); 
    },
    TOGGLE_MARKS_FOR_PERSON_BUTTONS(state, index) {
      Vue.set(state.marksForPersonButtons, index, !state.marksForPersonButtons[index]); 
    },
    TOGGLE_FLAG_SENT(state) {
      state.flagSent = !state.flagSent;
    },
    SET_STYLE(state, style) {
      state.style = style;
    },
    SET_VOLUME(state, volume) {
      state.currentVolume = volume;
    },
    setFinalList(state, newList) {
      state.finalList = newList;  // обновляем state.finalList
    },
    setFinalList2(state, newList) {
      state.finalList2 = newList;  // обновляем state.finalList
    },
    setWhoEatFood(state, whoEatFood) {
      state.whoEatFood = whoEatFood;
    },
  },
  actions: {
    updateFlagGo({ commit }, flagGo) {
      commit('SET_FLAG_GO', flagGo);
    },
    addMember({ commit }) {
      commit('ADD_MEMBER');
    },
    deleteMember({ commit }, index) {
      commit('DELETE_MEMBER', index);
    },
    addFood({ commit }) {
      commit('ADD_FOOD');
    },
    deleteFood({ commit }, index) {
      commit('DELETE_FOOD', index);
    },
    addPersonButtons({ commit }, index) {
      commit('SET_PERSON_BUTTONS', { index, value: true });
      commit('TOGGLE_MARKS_FOR_PERSON_BUTTONS', index);
    },
    toggleFlagSent({ commit }) {
      commit('TOGGLE_FLAG_SENT');
    },
    finalList({ commit }) {
      commit('setFinalList');
    },
    finalList2({ commit }) {
      commit('setFinalList2');
    },
    setStyle({ commit }, style) {
      commit('SET_STYLE', style);
    },
    changeVolume({ commit }, volume) {
      commit('SET_VOLUME', volume);
    },
    fetchData({ commit }) {
      const data1 = [];
      const data2 = [];
      commit('setFinalList', data1);
      commit('setFinalList2', data2);
    }
  },
  getters: {
    getGuests: (state) => state.guests,
    getFoods: (state) => state.foods,
    getPrices: (state) => state.prices,
    getSelectedBuyMan: (state) => state.selectedBuyMan,
    getPersonButtons: (state) => state.personButtons,
    getMarksForPersonButtons: (state) => state.marksForPersonButtons,
    getFlagGo: (state) => state.flagGo,
    getStyle: (state) => state.style,
    getWhoEatFood: (state) => state.whoEatFood
  }, 
});