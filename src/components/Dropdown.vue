<template>
  <div class="dropdown">
    <div class="dropdown__search">
      <Search @search="handleDropdownSearch" />
    </div>

    <div class="dropdown__control">
      <p class="subtitle">Выбрано {{ activeList.length }} из {{ defaultList.length }}</p>
      <button class="dropdown__control__button" @click="handleReset">
        Сбросить
      </button>
    </div>

    <div class="dropdown__list">
      <List
        v-for="item in defaultList"
        :key="item.id"
        :id="item.id"
        :text="item.value"
        :checked="activeList.includes(item.id)"
        @toggle="handleSelect(item.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import Search from './Search.vue';
import List from './List.vue';

const store = useStore();
const props = defineProps({
  idx: Number,
  defaultList: Array,
  activeList: Array
});

function handleDropdownSearch(search) {
  store.dispatch('findByQuery', { query: search, idx: props.idx });
}
function handleSelect(id) {
  store.dispatch('select', { id: id, idx: props.idx });
}
function handleReset() {
  store.dispatch('reset', { idx: props.idx });
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

.dropdown__control__button {
  line-height: 16px;
  font-size: 12px;
  font-weight: 500;
  color: #007BFF;
}

.dropdown__list {
  height: 239px;
  overflow-y: scroll;
}
</style>
