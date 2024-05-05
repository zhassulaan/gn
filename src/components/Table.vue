<template>
  <div class="table">
    <div class="table__header">
      <div class="table__header__cell" :style="{ width: '16.5278vw' }">
        <p class="subtitle">Название</p>
      </div>
      <div class="table__header__cell" :style="{ width: '12.4306vw' }">
        <p class="subtitle">Автор</p>
      </div>
      <div class="table__header__cell" :style="{ width: '8.6806vw' }">
        <p class="subtitle">Год издания</p>
      </div>
      <div class="table__header__cell" :style="{ width: '58.8889vw' }">
        <p class="subtitle">Формат книги</p>
      </div>
    </div>
    <div class="table__body">
      <Row v-for="book in $store.state.filtered_books" :key="book.key" :book="book" />
    </div>
  </div>
</template>

<script setup>
import Row from './Row.vue';
</script>

<style lang="sass" scoped>
.table
  width: 100%
  height: calc(100% - 63px)
  border-radius: 0 0 16px 16px
  &__header,
  &__body
    width: inherit
  &__header
    display: flex
    height: 40px
    &__cell
      padding: 12px 24px
  &__body
    height: calc(100% - 40px)
    overflow-y: scroll
    &::-webkit-scrollbar
      display: none
</style>
