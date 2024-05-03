<template>
  <div class="filter">
    <Search />

    <div class="filter__buttons">
      <Button :icon="Calendar" text="Год" />
      <Button :icon="Building" text="Формат книги" />
      <Button :icon="SearchWhite" text="Поиск" :isActive="true" />
    </div>
  </div>
</template>

<script setup>
import Search from './Search.vue'
import Button from './Button.vue'
import Calendar from './icons/Calendar.vue'
import Building from './icons/Building.vue'
import SearchWhite from './icons/search/White.vue'
</script>

<style scoped>
.filter {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 63px;
  padding: 11px 23px 12px;
  background-color: #FFF;
  border-radius: 16px 16px 0 0;
}

.filter__buttons {
  display: flex;
  gap: 12px;
  height: 100%;
}
</style>
