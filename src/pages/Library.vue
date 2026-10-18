<script setup>
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Limiter from '@/components/Limiter.vue'

const value = ref('')
const onAddBookMode = ref(false)

const store = useStore()

watch(value, (newValue) => {
  console.log(newValue)
  store.dispatch('fetchBooksByTitle', newValue)
})
</script>

<template>
  <div class="search-zone">
    <Input v-model="value" placeholder="Search your favorite book !" />
  </div>

  <Card title="Results" v-if="$store.getters.items && $store.getters.items.length">
    <Limiter :listOfData="$store.getters.items"></Limiter>
  </Card>

  <Card title="Your library" v-if="$store.getters.library.length">
    <Card variant="plain" v-for="book in $store.getters.library" :key="book.key">
      <div class="book">
        <img
          v-if="book.cover_i"
          class="book-cover"
          :src="'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg'"
          :alt="book.title"
        />
        <div v-else class="book-cover book-cover-empty">No cover</div>
        <div class="book-info">
          <h3 class="book-title">
            {{ book.title
            }}<template v-if="book.author_name"> - {{ book.author_name.join(', ') }}</template>
          </h3>
          <p class="book-text" v-if="book.first_publish_year">
            First published in {{ book.first_publish_year }}
          </p>
          <div class="book-foot">
            <span v-if="book.ratings_average" class="stars">
              <span v-for="i in 5" :key="i" :class="{ on: i <= Math.round(book.ratings_average) }"
                >★</span
              >
            </span>
            <Button variant="alert" @click="$store.commit('removeBookFromLibrary', book)"
              >Remove</Button
            >
            <Button
              v-if="$store.getters.favorites.includes(book)"
              variant="bookmark"
              title="Remove from favorites"
              @click="$store.commit('removeBookFromFavorites', book)"
              ><svg
                width="20"
                height="26"
                viewBox="0 0 20 26"
                stroke="#000"
                stroke-width="1.8"
                stroke-linejoin="round"
                fill="#facc15"
              >
                <path d="M3 2h14v21l-7-5-7 5z" /></svg
            ></Button>
            <Button
              v-else
              variant="bookmark"
              title="Add to favorites"
              @click="$store.commit('addBookToFavorites', book)"
              ><svg
                width="20"
                height="26"
                viewBox="0 0 20 26"
                stroke="#000"
                stroke-width="1.8"
                stroke-linejoin="round"
                fill="none"
              >
                <path d="M3 2h14v21l-7-5-7 5z" /></svg
            ></Button>
          </div>
        </div>
      </div>
    </Card>
  </Card>
</template>

<style scoped>
.search-zone {
  margin: 40px 0 24px;
}
</style>