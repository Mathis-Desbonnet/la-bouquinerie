<script setup>
import { computed } from 'vue'

const props = defineProps(['text', 'variant', 'customColor'])
defineEmits(['click'])

const customStyle = computed(() => {
  if (props.variant !== 'custom') return {}
  return {
    '--btn-custom-color': props.customColor,
  }
})
</script>

<template>
  <button class="btn" :class="`btn-${variant}`" :style="customStyle" @click="$emit('click')">
    {{ text }}<slot></slot>
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 14px;
  font-size: 0.78rem;
  font-weight: 600;
  font-family: 'Kanit', system-ui, sans-serif;
  border: 1px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    filter 0.2s ease,
    transform 0.1s ease;
}
.btn:hover {
  filter: brightness(0.93);
}
.btn:active {
  transform: scale(0.97);
}

.btn-primary {
  background-color: #0075ff;
  color: #ffffff;
}
.btn-secondary {
  background-color: #ececf1;
  color: #1b1b2f;
  border-color: #b9bfd0;
}
.btn-alert {
  background-color: #dc2626;
  color: #ffffff;
}
.btn-accent {
  background-color: #5b8fd0;
  color: #ffffff;
  padding: 7px 34px;
  font-weight: 400;
}
.btn-light {
  background-color: #ffffff;
  color: #1b1b2f;
  border-radius: 8px;
}
.btn-bookmark {
  background: transparent;
  padding: 0 2px;
  margin-left: auto;
  line-height: 0;
}
.btn-bookmark:hover {
  transform: scale(1.12);
}
.btn-custom {
  background-color: var(--btn-custom-color);
  color: #ffffff;
}
</style>
