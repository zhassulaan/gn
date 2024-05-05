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
  border: 1px solid #98A2B3;
  border-radius: 4px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

label::before,
label::after {
  position: absolute;
}

label::before {
  content: '';
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all .3s;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background-color: #FFF;
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
  content: '\2714';
  position: relative;
  top: -4px;
  left: 3px;
  font-size: 11px;
  color: #FFF;
}

input {
  outline: 1px auto #007BFF;
  accent-color: #007BFF;
  mix-blend-mode: multiply;
}

.list__text {
  font-size: 14px;
}
</style>
