<script setup>
defineProps(['placeholder'])
const model = defineModel()
</script>

<template>
  <label class="search">
    <input v-model="model" :placeholder="placeholder || 'Search your favorite book !'" />
    <span class="search-btn">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M15.5 15.5L21 21" />
      </svg>
    </span>
  </label>
</template>

<style scoped>
.search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 6px 5px 12px;
  background: #c3daee;
  border: 1px solid #5b8fd0;
  border-radius: 14px;
}
input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.9rem;
  color: #111;
}
input::placeholder {
  color: #111;
}
.search-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #5b8fd0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
</style>
