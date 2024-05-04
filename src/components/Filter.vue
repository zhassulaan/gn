<template>
  <div class="filter">
    <Search />

    <div class="filter__buttons">
      <div class="filter__buttons__box">
        <Button :icon="Calendar" text="Год" :onclick="() => handleDropdown(1)" />
        <Dropdown
          v-if="active === 1"
          :defaultList="years"
          :activeList="selectedYears"
          @toggle="toggleYear"
          @reset="resetYear"
        />
      </div>

      <div class="filter__buttons__box">
        <Button :icon="Building" text="Формат книги" :onclick="() => handleDropdown(2)" />
        <Dropdown
          v-if="active === 2"
          :defaultList="formats"
          :activeList="selectedFormats"
          @toggle="toggleFormat"
          @reset="resetFormat"
        />
      </div>

      <Button :icon="SearchWhite" text="Поиск" :isActive="true" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Search from './Search.vue'
import Button from './Button.vue'
import Dropdown from './Dropdown.vue'
import Calendar from './icons/Calendar.vue'
import Building from './icons/Building.vue'
import SearchWhite from './icons/search/White.vue'

const props = defineProps({
  years: Array,
  formats: Array
});
const active = ref(0);
const selectedYears = ref([]);
const selectedFormats = ref([]);

function handleDropdown(id) {
  if (!active.value || active.value !== id)
    active.value = id;
  else
    active.value = 0;
}
function toggleYear(id) {
  const index = selectedYears.value.indexOf(id);
  if (index === -1) {
    selectedYears.value.push(id);
  } else {
    selectedYears.value.splice(index, 1);
  }
}
function toggleFormat(id) {
  const index = selectedFormats.value.indexOf(id);
  if (index === -1) {
    selectedFormats.value.push(id);
  } else {
    selectedFormats.value.splice(index, 1);
  }
}
function resetYear() {
  selectedYears.value = [];
}
function resetFormat() {
  selectedFormats.value = [];
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
