<script setup>
import Button from './Button.vue'

defineProps({
  title: { type: String },
  variant: { type: String, default: 'panel' },
  hasHoverEffect: { type: Boolean, default: false },
  hasCloseButton: { type: Boolean, default: false },
})
defineEmits(['click', 'close'])
</script>

<template>
  <section
    class="card"
    :class="[`card-${variant}`, { 'card-hoverable': hasHoverEffect }]"
    @click="$emit('click')"
  >
    <header v-if="title || $slots.header || hasCloseButton" class="card-header">
      <slot name="header"
        ><h2 class="card-title">{{ title }}</h2></slot
      >
      <Button variant="alert" v-if="hasCloseButton" @click="$emit('close')" text="Close"></Button>
    </header>
    <div class="card-body">
      <slot></slot>
    </div>
    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #111;
}
.card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 400;
}
.card-footer {
  display: flex;
  justify-content: center;
}

.card-panel,
.card-accent {
  background: #c3daee;
  border: 1px solid #5b8fd0;
  border-radius: 22px;
  padding: 10px 8px 14px;
  margin-bottom: 16px;
}
.card-accent {
  background: #5b8fd0;
}
.card-accent .card-title {
  font-weight: 700;
}

.card-plain {
  gap: 0;
}

.card-stat,
.card-stat-light {
  background: #5b8fd0;
  color: #fff;
  border-radius: 12px;
  padding: 10px 6px;
  gap: 0;
  font-family: 'Kanit', system-ui, sans-serif;
  text-align: center;
  justify-content: center;
}
.card-stat .card-body,
.card-stat-light .card-body {
  gap: 0;
  align-items: center;
}
.card-stat-light {
  background: #eef7ff;
  color: #1b1b2f;
}

.card-hoverable:hover {
  cursor: pointer;
  filter: brightness(0.96);
}
</style>
