<template>
  <div class="list">
    <div class="list__checkbox">
      <input
        type="checkbox"
        :id="id"
        :checked="checked"
        @change="$emit('toggle')"
      />
      <label :for="id"></label>
    </div>
    <p class="list__text">{{ text }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  id: String,
  text: [String, Number],
  checked: Boolean
});
</script>

<style scoped>
.list {
  display: flex;
  gap: 12px;
  width: 100%;
  height: 48px;
  padding: 16px 12px;
}

.list__checkbox {
  position: relative;
}

input {
  display: none;
}

input + label {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid #98A2B3;
  border-radius: 4px;
  cursor: pointer;
}

label::before,
label::after {
  position: absolute;
}

label::before {
  top: 50%;
  left: 50%;
  z-index: -1;
  content: '';
  width: 32px;
  height: 32px;
  background-color: #FFF;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all .3s;
}

input:checked + label,
input:hover + label {
  border-color: #007BFF;
}

input:hover + label {
  border-color: #007BFF;
}

input:hover + label::before {
  background-color: #E6F2FF;
}

input:checked + label {
  background-color: #007BFF;
}

input:checked + label::after {
  position: relative;
  top: -6px;
  left: 3px;
  content: '\2714';
  font-size: 11px;
  color: #FFF;
}

input {
  accent-color: #007BFF;
  mix-blend-mode: multiply;
  outline: 1px auto #007BFF;
}

.list__text {
  line-height: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #1D2739;
}
</style>
