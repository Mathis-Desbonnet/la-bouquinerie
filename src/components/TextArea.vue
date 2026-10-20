<script setup>
defineProps({
  placeholder: { type: String, default: '' },
  rows: { type: Number, default: 4 },
  variant: { type: String, default: 'default' },
})
const model = defineModel()
</script>

<template>
  <textarea
    v-model="model"
    class="textarea"
    :class="`textarea-${variant}`"
    :placeholder="placeholder"
    :rows="rows"
  ></textarea>
</template>

<style scoped>
.textarea {
  width: 100%;
  padding: 10px 12px;
  background: #c3daee;
  border: 1px solid #5b8fd0;
  border-radius: 14px;
  outline: none;
  resize: vertical;
  font-family: inherit;
  font-size: 0.9rem;
  color: #111;
}
.textarea-light {
  background: #eef7ff;
}
.textarea:focus {
  border-color: #0075ff;
}
.textarea::placeholder {
  color: #4a5b70;
}
</style>
