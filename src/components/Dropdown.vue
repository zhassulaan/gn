<template>
  <div class="dropdown">
    <div class="dropdown__search">
      <Search />
    </div>

    <div class="dropdown__control">
      <p class="dropdown__control__counter">Выбрано {{ activeList.length }} из {{ list.length }}</p>
      <button class="dropdown__control__button" @click="resetCounter">
        Сбросить
      </button>
    </div>

    <div class="dropdown__list">
      <List
        v-for="item in list"
        :key="item.id"
        :id="`cb${item.id}`"
        :text="item.value"
        :checked="activeList.includes(`cb${item.id}`)"
        @checkbox-toggled="toggleCheckbox"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Search from './Search.vue'
import List from './List.vue'

const props = defineProps({
  list: Array
});
const activeList = ref([]);

function toggleCheckbox(id) {
  const index = activeList.value.indexOf(id);
  if (index === -1) {
    activeList.value.push(id);
  } else {
    activeList.value.splice(index, 1);
  }
}
function resetCounter() {
  activeList.value = [];
}
</script>

<style scoped>
.dropdown {
  position: absolute;
  top: calc(100% + 16px);
  left: 0;
  z-index: 2;
  width: 240px;
  height: 320px;
  background-color: #FFF;
  border: 1px solid #F0F2F5;
  border-radius: 8px;
}

.dropdown__search {
  height: 40px;
  margin: 7px 0 8px;
  padding: 0 7px;
}

.dropdown__control {
  display: flex;
  justify-content: space-between;
  padding: 4px 11px;
}

.dropdown__control__counter,
.dropdown__control__button {
  line-height: 16px;
  font-size: 12px;
  font-weight: 500;
}

.dropdown__control__counter {
  color: #667185;
}

.dropdown__control__button {
  color: #007BFF;
  cursor: pointer;
}

.dropdown__list {
  height: 239px;
  overflow-y: scroll;
}
</style>
