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

<style scoped>
.search {
  position: relative;
  width: 100%;
  height: 100%;
}

.search__input {
  width: 100%;
  padding: 12px 36px 12px 16px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 500;
  background-color: #F7F9FC;
  border-radius: 8px;
}

.search__input,
.search__input::placeholder {
  color: #98A2B3;
}

.search__input:hover,
.search__input:focus,
.search__input:valid,
.search__input:hover::placeholder,
.search__input:focus::placeholder,
.search__input:valid::placeholder {
  color: #1D2739;
}

.search__input:hover {
  background-color: #E6F2FF;
}

.search__input:focus {
  background-color: #FFF;
  border: 1px solid #007BFF;
}

.search__input:valid {
  background-color: #F7F9FC;
}

.search__button {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
