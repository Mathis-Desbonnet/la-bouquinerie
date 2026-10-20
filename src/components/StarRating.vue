<script setup>
import { computed } from 'vue'

const props = defineProps({
  rating: { type: Number, default: 0 },
  max: { type: Number, default: 5 },
  size: { type: Number, default: 18 },
  emptyColor: { type: String, default: '#17356b' },
  filledColor: { type: String, default: '#0075ff' },
})

const filled = computed(() => Math.max(0, Math.min(props.max, Math.round(props.rating))))
</script>

<template>
  <span class="stars" :aria-label="`${filled} / ${max}`">
    <svg
      v-for="i in max"
      :key="i"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      :fill="i <= filled ? filledColor : emptyColor"
    >
      <path d="M12 1.8l3.2 6.9 7.5.9-5.6 5.1 1.5 7.4L12 18.4l-6.6 3.7 1.5-7.4L1.3 9.6l7.5-.9z" />
    </svg>
  </span>
</template>

<style scoped>
.stars {
  display: inline-flex;
  gap: 1px;
  line-height: 0;
}
</style>
