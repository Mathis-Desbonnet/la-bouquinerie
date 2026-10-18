<script setup>
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

const value = ref('')

const store = useStore()

watch(value, (newValue) => {
  console.log(newValue)
  store.dispatch('fetchBooksByTitle', newValue)
})
</script>

<template>
  <h1 class="page-title">Your favorites</h1>
  <Card title="Your favorite books">
    <p v-if="!$store.getters.favorites.length" class="empty">No favorites yet.</p>
    <Card variant="plain" v-for="book in $store.getters.favorites" :key="book.key">
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
            <Button @click="$store.commit('removeBookFromLibrary', book)" variant="alert"
              >Remove from library</Button
            >
            <Button
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
                <path d="M3 2h14v21l-7-5-7 5z" />
                </svg></Button>
          </div>
        </div>
      </div>
    </Card>
  </Card>
</template>

<style scoped>
.page-title {
  margin: 0 0 24px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 400;
}
.empty {
  margin: 0;
  font-size: 0.8rem;
}
</style>