<template>
  <button class="button" :class="{ 'button_blue': isActive }">
    <component :is="icon" v-if="icon" class="button__icon" />
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
});
</script>

<style scoped>
@keyframes button-animation-in {
  0% {
    width: 1px;
    height: 1px;
  } 100% {
    width: 400px;
    height: 400px;
  }
}
@keyframes button-animation-out {
  0% {
    width: 400px;
    height: 400px;
  } 100% {
    width: 1px;
    height: 1px;
  }
}

.button {
  position: relative;
  display: flex;
  gap: 12px;
  width: 100%;
  padding: 12px 20px;
  background-color: #F7F9FC;
  border-radius: 8px;
  cursor: pointer;
}

.button:hover {
  background-color: #E6F2FF;
}

.button:active {
  background-color: #B0D6FF;
}

.button_blue {
  overflow: hidden;
}

.button_blue,
.button_blue:hover,
.button_blue:active {
  background-color: #007BFF;
}

.button_blue::before {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  content: '';
  transform: translate(-50%, -50%);
  background-color: #0070E8;
  border-radius: 50%;
  transition: all .3s;
}

.button_blue:active::before,
.button_blue:hover::before {
  animation: button-animation-in 2.5s;
}

.button__icon,
.button__text {
  z-index: 2;
}

.button__text {
  font-size: 14px;
}

.button_blue .button__text {
  color: #FFF;
}
</style>
