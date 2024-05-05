<template>
  <div class="search">
    <input type="text" placeholder="Поиск" required pattern=".*" class="search__input" @input="search" />
    <search-grey class="search__button" />
  </div>
</template>

<script setup>
import SearchGrey from './icons/search/Grey.vue'

const emit = defineEmits(['search']);
const search = (e) => {
  emit('search', e.target.value);
};
</script>

<style lang="sass" scoped>
.search
  position: relative
  width: 100%
  height: 100%
  &__input,
  &__input::placeholder
    color: #98A2B3
  &__input
    border-radius: 8px
    width: 100%
    padding: 12px 36px 12px 16px
    background-color: #F7F9FC
    font-size: 14px
    line-height: 16px
    font-weight: 500
    &:hover,
    &:focus,
    &:valid,
    &:hover::placeholder,
    &:focus::placeholder,
    &:valid::placeholder
      color: #1D2739
    &:hover
      background-color: #E6F2FF
    &:focus
      border: 1px solid #007BFF
      background-color: #FFF
    &:valid
      background-color: #F7F9FC
  &__button
    position: absolute
    top: 50%
    right: 16px
    transform: translateY(-50%)
    cursor: pointer
</style>
