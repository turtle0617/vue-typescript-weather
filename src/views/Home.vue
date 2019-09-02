<template>
  <div class="home">
    <SearchBar
    :searchCondition="searchCondition"
    @update-searchCondition="searchCondition = $event"
    @search-weather="$store.dispatch('getWeather',searchCondition)"
    />
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
  get weatherInfo(): object {
    return this.$store.getters.weatherInfo;
  }
}
</script>
