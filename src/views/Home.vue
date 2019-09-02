<template>
  <div class="home">
    <SearchBar
      :searchCondition="searchCondition"
      @update-searchCondition="searchCondition = $event"
      @search-weather="searchWeather"
    />
    <div class="weatherInfo" v-if="weatherInfo">
      <div class="city">
        <span class="title">城市：</span>
        <span>{{weatherInfo.name}}</span>
      </div>
      <div class="weatherDescription">
        <span class="title">天氣概況：</span>
        <span>{{weatherDescription}}</span>
      </div>
      <div class="temperature__average">
        <span class="title">平均氣溫：</span>
        <span>{{weatherInfo.main.temp}}</span>
        <span class="unit">°C</span>
      </div>
      <div class="temperature__max">
        <span class="title">最高溫：</span>
        <span>{{weatherInfo.main.temp_max}}</span>
        <span class="unit">°C</span>
      </div>
      <div class="temperature__min">
        <span class="title">最低溫：</span>
        <span>{{weatherInfo.main.temp_min}}</span>
        <span class="unit">°C</span>
      </div>
      <div class="humidity">
        <span class="title">溼度：</span>
        <span>{{weatherInfo.main.humidity}}</span>
        <span class="unit">%</span>
      </div>
    </div>
    <div class="notResult" v-if="notResult">
      <h3>沒有此城市，請重新搜尋</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchBar from '@/components/SearchBar.vue';
import API from '@/utils/API';
@Component({
  components: {
    SearchBar,
  },
})
export default class Home extends Vue {
  private searchCondition: string = '';
  private notResult: boolean = false;
  get weatherInfo(): object {
    return Object.keys(this.$store.getters.getWeatherInfo).length
      ? this.$store.getters.getWeatherInfo
      : false;
  }
  get weatherDescription(): string {
    return this.$store.getters.getWeatherInfo.weather.length
      ? this.$store.getters.getWeatherInfo.weather[0].description
      : '錯誤';
  }
  private async searchWeather(): Promise<void> {
    try {
      this.notResult = false;
      await this.$store.dispatch('getWeather', this.searchCondition);
    } catch (error) {
      this.notResult = true;
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  padding-top: 100px;
  width: 50%;
  margin: 0 auto;
}
.weatherInfo {
  text-align: left;
  .title {
    font-weight: bold;
  }
  > div {
    padding: 0.5rem 0;
  }
  .unit {
    margin-left: 0.2rem;
  }
}
</style>