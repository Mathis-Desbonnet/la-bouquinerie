<script setup>
defineEmits(['close'])
</script>

<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(393px, 100%);
  height: 100%;
  padding: 0 16px;
  background: rgba(0, 0, 0, 0.6);
}
.modal-content {
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
}
.modal-content :deep(.card) {
  margin-bottom: 0;
}
</style>
