<template>
  <div class="row">
    <div class="row__cell" :style="{ width: '16.5278vw' }">
      <p class="row__cell__text">{{ book.title }}</p>
    </div>

    <div class="row__cell" :style="{ width: '12.4306vw' }">
      <p v-for="(author, idx) in book.author_name" :key="idx" class="row__cell__text">{{ author }}</p>
    </div>

    <div class="row__cell" :style="{ width: '8.6806vw', justifyContent: 'end' }">
      <p class="row__cell__text">{{ book.first_publish_year }}</p>
    </div>

    <div class="row__cell row__cell_blue" :style="{ width: '58.8889vw' }">
      <p
        v-if="book.format.length > 3 && book.format.length !== format.length"
        v-for="(formatItem, idx) in format"
        :key="idx"
        class="row__cell__text"
      >{{ formatItem }}</p>
      <p
        v-if="book.format.length > 3 && book.format.length !== format.length"
        @click="showAllFormat"
      >еще +{{ book.format.length - 3 }}</p>

      <p v-else v-for="(formatItem, ids) in book.format" :key="ids" class="row__cell__text">{{ formatItem }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  book: Object
});
const format = ref(props.book.format.slice(0, 3));

function showAllFormat() {
  format.value = props.book.format;
}
</script>

<style scoped>
.row {
  position: relative;
  display: flex;
  width: 100%;
  height: 64px;
  background-color: #FFF;
}

.row::after {
  position: absolute;
  left: 0;
  bottom: 0;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #F0F2F5;
}

.row:hover {
  background-color: #F9FAFB;
}

.row__cell {
  display: flex;
  padding: 24px;
  overflow-x: scroll;
}

.row__cell::-webkit-scrollbar {
  display: none
}

.row__cell_blue {
  gap: 12px;
  padding: 20px;
}

.row__cell__text {
  width: max-content;
  line-height: 16px;
  font-size: 12px;
  font-weight: 400;
  text-wrap: nowrap;
  color: #1D2739;
}

.row__cell_blue .row__cell__text {
  padding: 4px 8px;
  border-radius: 8px;
  background-color: #E6F2FF
}
</style>
