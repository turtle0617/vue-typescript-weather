<template>
  <div class="searchBar">
    <input type="text" name="city" id="city" @input="updateSarchCondition"/>
    <button @click="searchWeather">Search</button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
@Component
export default class SearchBar extends Vue {
  @Prop() private searchCondition!: string;
  @Emit('update-searchCondition')
  public updateSarchCondition(e: any) {
    return e.target.value;
  }
  @Emit('search-weather')
  public searchWeather() {
    return undefined;
  }

}
</script>