<template>
  <div class="search">
    <input type="text" placeholder="Поиск" class="search__input" />
    <search-grey />
  </div>
</template>

<script setup>
import SearchGrey from './icons/search/Grey.vue'
</script>

<style scoped>
.search {
  display: flex;
  align-items: start;
  gap: 4px;
  width: 360px;
  height: 100%;
  padding: 12px 16px;
  background-color: #F7F9FC;
  border-radius: 8px;
}

.search__input {
  width: 100%;
  height: 16px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 500;
}
</style>
