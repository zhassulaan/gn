<template>
  <div class="filter">
    <Search @search="handleMainSearch" />

    <div class="filter__buttons">
      <div class="filter__buttons__box">
        <Button :icon="Calendar" text="Год" :onclick="() => handleDropdown(1)" />
        <Dropdown
          v-if="active === 1"
          :idx="1"
          :defaultList="$store.state.filtered_years"
          :activeList="$store.state.selected_years"
        />
      </div>

      <div class="filter__buttons__box">
        <Button :icon="Building" text="Формат книги" :onclick="() => handleDropdown(2)" />
        <Dropdown
          v-if="active === 2"
          :idx="2"
          :defaultList="$store.state.filtered_formats"
          :activeList="$store.state.selected_formats"
        />
      </div>

      <Button :icon="SearchWhite" text="Поиск" :isActive="true" @click="$store.dispatch('filterBooks')" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Search from './Search.vue'
import Button from './Button.vue'
import Dropdown from './Dropdown.vue'
import Calendar from './icons/Calendar.vue'
import Building from './icons/Building.vue'
import SearchWhite from './icons/search/White.vue'

const store = useStore();
const active = ref(0);

function handleMainSearch(search) {
  store.dispatch('findByTitle', search);
}
function handleDropdown(id) {
  if (!active.value || active.value !== id)
    active.value = id;
  else
    active.value = 0;
}
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

.search {
  width: 360px;
}

.filter__buttons {
  display: flex;
  gap: 12px;
  height: 100%;
}

.filter__buttons__box {
  position: relative;
}
</style>
