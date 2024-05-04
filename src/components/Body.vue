<template>
  <main class="container">
    <Filter :years="years" :formats="formats" />
    <Table :data="data" />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchData } from '@/composables/api';
import { uniqueArray, flattenedArray, removeUndefined } from '@/composables/actions';
import Filter from './Filter.vue'
import Table from './Table.vue'

const data = ref([]);
const years = ref([]);
const formats = ref([]);

onMounted(async () => {
  data.value = await fetchData();

  years.value = data.value.map(item => item.first_publish_year);
  years.value = uniqueArray(removeUndefined(years.value.sort()))

  formats.value = data.value.map(item => item.format);
  formats.value = flattenedArray(formats.value);
  formats.value = uniqueArray(removeUndefined(formats.value.sort()))
});
</script>

<style scoped>
.container {
  height: calc(100% - 72px);
  border: 1px solid #F0F2F5;
  border-radius: 16px;
}
</style>
