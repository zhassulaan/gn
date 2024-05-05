<template>
  <main class="container">
    <Filter />
    <Table />
  </main>
</template>

<script setup>
import Filter from './Filter.vue';
import Table from './Table.vue';
</script>

<style scoped>
.container {
  overflow: hidden;
  border: 1px solid #F0F2F5;
  border-radius: 16px;
  height: calc(100% - 72px);
}
</style>
