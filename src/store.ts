import Vue from 'vue';
import Vuex from 'vuex';
import API from '@/utils/API';

Vue.use(Vuex);
interface Response {
  data?: object;
  [propName: string]: any;
}
export default new Vuex.Store({
  state: {
    weatherInfo: {}
  },
  getters: {
    getWeatherInfo(state) {
      return state.weatherInfo;
    },
  },
  mutations: {
    getWeather(state, data) {
      state.weatherInfo = data;
    },
  },
  actions: {
    async getWeather({ commit }, condition: string) {
      const { data }: Response = await API.getWeather({
        q: condition,
      });
      commit('getWeather', data);
    },
  },
});
