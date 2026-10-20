<script setup>
import { ref, watch, computed } from 'vue'
import Card from './Card.vue'
import Button from './Button.vue'

const props = defineProps(['listOfData'])
const articlesListSearched = ref([])

watch(
  () => props.listOfData,
  (newList) => {
    if (newList) {
      articlesListSearched.value = [...newList]
      console.log(articlesListSearched.value)
    }
  },
  { immediate: true },
)

const numberOfArticlesToShow = ref(5)
const currentPage = ref(1)
const numberOfPage = computed(() => {
  if (articlesListSearched.value.length === 0) return 1
  return Math.ceil(articlesListSearched.value.length / numberOfArticlesToShow.value)
})

const indexBeginToShow = computed(() => {
  return (currentPage.value - 1) * numberOfArticlesToShow.value
})

const indexEndToShow = computed(() => {
  return Math.min(
    indexBeginToShow.value + numberOfArticlesToShow.value,
    articlesListSearched.value.length,
  )
})

function changePage(index) {
  currentPage.value = index
}
</script>

<template>
  <div class="limiter">
    <header class="limiter-head">
      <label>
        Per page
        <select v-model="numberOfArticlesToShow">
          <option :value="1">1</option>
          <option :value="5">5</option>
          <option :value="15">15</option>
          <option :value="30">30</option>
        </select>
      </label>
    </header>
    <div class="limiter-list">
      <Card
        variant="plain"
        v-for="bookSearch in articlesListSearched.slice(indexBeginToShow, indexEndToShow)"
        :key="bookSearch.key"
      >
        <div class="book">
          <img
            v-if="bookSearch.cover_i"
            class="book-cover"
            :src="'https://covers.openlibrary.org/b/id/' + bookSearch.cover_i + '-M.jpg'"
            :alt="bookSearch.title"
          />
          <div v-else class="book-cover book-cover-empty">No cover</div>
          <div class="book-info">
            <h3 class="book-title">
              <RouterLink :to="'/book/' + bookSearch.key.split('/').pop()" class="book-link">{{
                bookSearch.title
              }}</RouterLink
              ><template v-if="bookSearch.author_name">
                - {{ bookSearch.author_name.join(', ') }}</template
              >
            </h3>
            <p class="book-text" v-if="bookSearch.first_publish_year">
              First published in {{ bookSearch.first_publish_year }}
            </p>
            <div class="book-foot">
              <span v-if="bookSearch.ratings_average" class="stars">
                <span
                  v-for="i in 5"
                  :key="i"
                  :class="{ on: i <= Math.round(bookSearch.ratings_average) }"
                  >★</span
                >
              </span>
              <Button
                v-if="$store.getters.library.includes(bookSearch)"
                variant="primary"
                text="In your library"
              />
              <Button
                v-else
                variant="secondary"
                text="Add to your library"
                @click="$store.commit('addBookToLibrary', bookSearch)"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
    <footer class="limiter-pages">
      <button
        v-for="index in numberOfPage"
        :key="index"
        :class="{ active: index === currentPage }"
        @click="() => changePage(index)"
      >
        {{ index }}
      </button>
    </footer>
  </div>
</template>

<style scoped>
.limiter {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.limiter-head {
  font-size: 0.75rem;
  text-align: right;
}
.limiter-head select {
  border: 1px solid #5b8fd0;
  border-radius: 8px;
  background: #eef7ff;
  padding: 2px 4px;
}
.limiter-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.limiter-pages {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
}
.limiter-pages button {
  min-width: 28px;
  height: 28px;
  border: 1px solid #5b8fd0;
  border-radius: 8px;
  background: #eef7ff;
  cursor: pointer;
}
.limiter-pages button.active {
  background: #0075ff;
  color: #fff;
  border-color: #0075ff;
}
.book-link {
  color: inherit;
  text-decoration: none;
}
.book-link:hover {
  text-decoration: underline;
}
</style>
