<template>
  <button class="button" :class="{ 'button_blue': isActive }">
    <component :is="icon" v-if="icon" />
    <p v-if="text" class="button__text">{{ text }}</p>
  </button>
</template>

<script setup>
const props = defineProps({
  icon: Object,
  text: String,
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.button {
  display: flex;
  gap: 12px;
  width: 100%;
  padding: 12px 20px;
  background-color: #F7F9FC;
  border-radius: 8px;
}

.button:hover {
  background-color: #B0D6FF;
}

.button_blue {
  background-color: #007BFF;
}

.button__text {
  line-height: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #1D2739;
  text-wrap: nowrap;
}

.button_blue .button__text {
  color: #FFF;
}
</style>
