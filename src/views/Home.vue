<template>
  <div class="home">
    <div class="search">
      <div class="search__title">
        <h2>搜尋天氣</h2>
        <span class="notice">(請輸入城市英文名稱)</span>
      </div>
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
    <div class="histories">
      <h2>歷史記錄</h2>
      <ol class="historiesList" v-if="historiesSearch">
        <li
          class="historyItem"
          v-for="(history,index) in historiesSearch"
          :key="index"
          @click="searchWithHistory(history)"
        >
          <span>{{history}}</span>
        </li>
      </ol>
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
  get historiesSearch(): string[] {
    return this.$store.getters.getHistorySearch;
  }
  private async searchWeather(): Promise<void> {
    try {
      this.notResult = false;
      await this.$store.dispatch('getWeather', this.searchCondition);
    } catch (error) {
      this.notResult = true;
    }
  }
  private async searchWithHistory(condition: string): Promise<void> {
    try {
      this.notResult = false;
      await this.$store.dispatch('getWeather', condition);
    } catch (error) {
      this.notResult = true;
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  padding-top: 100px;
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.search {
  width: 50%;
  box-sizing: border-box;
  padding-right: 1rem;
  @media screen and (max-width: 576px) {
    width: 100%;
    margin-bottom: 1rem;
    padding-right: 0;
  }
}
.search__title {
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  h2 {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 0.5rem;
  }
}
.histories {
  width: 50%;
  margin-top: 0;
  h2 {
    margin-top: 0;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
  }
}
.historyItem {
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(200, 200, 200, 0.4);
  }
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