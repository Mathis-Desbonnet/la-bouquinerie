<script setup>
defineProps({
  options: { type: Array, required: true },
  variant: { type: String, default: 'default' },
})
const model = defineModel()
</script>

<template>
  <label class="select" :class="`select-${variant}`">
    <select v-model="model">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span class="select-arrow">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M5 9l7 7 7-7" />
      </svg>
    </span>
  </label>
</template>

<style scoped>
.select {
  position: relative;
  display: flex;
  align-items: center;
  background: #c3daee;
  border: 1px solid #5b8fd0;
  border-radius: 14px;
}
.select-light {
  background: #eef7ff;
}
select {
  flex: 1;
  min-width: 0;
  height: 40px;
  padding: 0 40px 0 12px;
  border: none;
  outline: none;
  background: transparent;
  appearance: none;
  font-family: inherit;
  font-size: 0.9rem;
  color: #111;
  cursor: pointer;
}
.select:focus-within {
  border-color: #0075ff;
}
.select-arrow {
  position: absolute;
  right: 6px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #5b8fd0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
</style>
