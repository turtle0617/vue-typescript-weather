<template>
  <div class="searchBar">
    <input type="text" name="city" id="city" placeholder="tainan" :value="searchCondition" @input="updateSarchCondition" />
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
.searchBar {
  display: flex;
  flex-wrap: wrap;
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
    background: white;
  }
  @media screen and (max-width: 576px) {
    input {
      flex: 0 1 100%;
    }
    button {
      margin-left: 0;
      margin-top: 0.5rem;
      padding: 0.5rem 1rem;
    }
  }
}
</style>