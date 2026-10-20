<script setup>
import Input from '@/components/Input.vue'
import Card from '@/components/Card.vue'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Limiter from '@/components/Limiter.vue'

const value = ref('')

const store = useStore()

store.commit('resetSearch')

function search() {
  store.dispatch('fetchBooksByTitle', value.value)
}
</script>

<template>
  <div class="search-zone">
    <Input v-model="value" placeholder="Search your favorite book !" @click="search" />
  </div>

  <Card title="Results" v-if="$store.getters.items && $store.getters.items.length">
    <Limiter :listOfData="$store.getters.items"></Limiter>
  </Card>
</template>

<style scoped>
.search-zone {
  margin: 40px 0 24px;
}
</style>
