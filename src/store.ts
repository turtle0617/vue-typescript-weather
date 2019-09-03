import Vue from 'vue';
import Vuex from 'vuex';
import API from '@/utils/API';

Vue.use(Vuex);
interface Response {
  data?: object;
  [propName: string]: any;
}
interface StateTree {
  weatherInfo: object;
  historySearch: string[];
}

export default new Vuex.Store({
  state: {
    weatherInfo: {},
    historySearch: localStorage.getItem('historySearch')
      ? JSON.parse(localStorage.getItem('historySearch') as string)
      : [],
  },
  getters: {
    getWeatherInfo(state) {
      return state.weatherInfo;
    },
    getHistorySearch(state) {
      return state.historySearch.length
        ? state.historySearch.slice().reverse()
        : false;
    },
  },
  mutations: {
    updateHistorySearch(state: StateTree, condition: string) {
      state.historySearch.push(condition);
      if (state.historySearch.length > 10) {
        state.historySearch.shift();
      }
      localStorage.setItem('historySearch', JSON.stringify(state.historySearch));
    },
    getWeather(state: StateTree, data: object) {
      state.weatherInfo = data;
    },
    resetWeatherInfo(state: StateTree) {
      state.weatherInfo = {};
    },
  },
  actions: {
    async getWeather({ commit }, condition: string) {
      commit('resetWeatherInfo');
      commit('updateHistorySearch', condition);
      const { data }: Response = await API.getWeather({
        q: condition,
      });
      commit('getWeather', data);
    },
  },
});
