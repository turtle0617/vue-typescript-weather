<template>
  <div class="searchBar">
    <input type="text" name="city" id="city" placeholder="tainan"  @input="updateSarchCondition"/>
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
    return void 0;
  }

}
</script>
<style lang="scss" scoped>
.searchBar{
  display: flex;
  input {
    flex: 1 0 auto;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid black;
  }
  button {
    margin-left: 1rem;
    border-radius: 5px;
  }
}
</style>