<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  coverId: { type: [Number, String], default: null },
  alt: { type: String, default: '' },
  width: { type: Number, default: 102 },
})

const url = computed(() => {
  if (props.src) return props.src
  if (props.coverId) return `https://covers.openlibrary.org/b/id/${props.coverId}-M.jpg`
  return ''
})
</script>

<template>
  <div class="cover" :style="{ width: width + 'px', height: Math.round(width * 1.34) + 'px' }">
    <img v-if="url" :src="url" :alt="alt" loading="lazy" />
    <span v-else class="cover-empty">No cover</span>
  </div>
</template>

<style scoped>
.cover {
  flex-shrink: 0;
  border: 2px solid #4d86d6;
  border-radius: 14px;
  overflow: hidden;
  background: #e3eefa;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cover-empty {
  font-size: 0.7rem;
  color: #4d86d6;
  text-align: center;
}
</style>
