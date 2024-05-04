<template>
  <div class="table">
    <div class="table__header">
      <div class="table__header__cell" :style="{ width: '16.5278vw' }">
        <p class="table__header__cell__text">Название</p>
      </div>
      <div class="table__header__cell" :style="{ width: '12.4306vw' }">
        <p class="table__header__cell__text">Автор</p>
      </div>
      <div class="table__header__cell" :style="{ width: '8.6806vw' }">
        <p class="table__header__cell__text">Год издания</p>
      </div>
      <div class="table__header__cell" :style="{ width: '58.8889vw' }">
        <p class="table__header__cell__text">Жанр книги</p>
      </div>
    </div>
    <div class="table__body">
      <Row v-for="book in $store.state.books" :key="book.key" :book="book" />
    </div>
  </div>
</template>

<script setup>
import Row from './Row.vue'

import { useStore } from 'vuex';
const store = useStore();
console.log(store.state);
</script>

<style scoped>
.table {
  width: 100%;
  height: calc(100% - 63px);
  border-radius: 0 0 16px 16px;
}

.table__header,
.table__body {
  width: inherit;
}

.table__header {
  display: flex;
  height: 40px;
}

.table__header__cell {
  padding: 12px 24px;
}

.table__header__cell__text {
  width: max-content;
  line-height: 16px;
  font-size: 12px;
  font-weight: 500;
  color: #667185;
}

.table__body {
  height: calc(100% - 40px);
  overflow-y: scroll;
}

.table__body::-webkit-scrollbar {
  display: none
}
</style>
