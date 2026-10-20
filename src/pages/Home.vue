<script setup>
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
import Input from '@/components/Input.vue'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

const value = ref('')
const onAddBookMode = ref(false)

const store = useStore()

watch(value, (newValue) => {
  console.log(newValue)
  store.dispatch('fetchBooksByTitle', newValue)
})

function changeBookState(book) {
  console.log(store.getters.libraryDetails.find((obj) => obj.book == book))
  if (store.getters.libraryDetails.find((obj) => obj.book == book).state == 0) {
    store.commit('setBookState', { book: book, newState: 1 })
  } else if (store.getters.libraryDetails.find((obj) => obj.book == book).state == 1) {
    store.commit('setBookState', { book: book, newState: 2 })
  } else {
    store.commit('setBookState', { book: book, newState: 1 })
  }
}
</script>

<template>
  <h1 class="page-title">
    {{ onAddBookMode ? "François' personal library" : 'Welcome back, François' }}
  </h1>

  <Card title="Your Personal library">
    <p v-if="!$store.getters.library.length" class="empty">
      Your library is empty. Use the search tab to add a book.
    </p>
    <Card
      variant="plain"
      v-for="book in onAddBookMode ? $store.getters.library : $store.getters.library.slice(0, 2)"
      :key="book.key"
    >
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
            <Button @click="() => changeBookState(book)"
              ><div v-if="$store.getters.libraryDetails.find((obj) => obj.book == book).state == 0">
                Not reading
              </div>
              <div
                v-else-if="$store.getters.libraryDetails.find((obj) => obj.book == book).state == 1"
              >
                Reading
              </div>
              <div v-else>Finished</div></Button
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
                <path d="M3 2h14v21l-7-5-7 5z" />
              </svg>
            </Button>
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
                <path d="M3 2h14v21l-7-5-7 5z" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </Card>
    <template #footer v-if="$store.getters.library.length > 2">
      <Button variant="accent" @click="onAddBookMode = !onAddBookMode">{{
        onAddBookMode ? 'Hide full list' : 'See full list'
      }}</Button>
    </template>
  </Card>

  <template v-if="!onAddBookMode">
    <Card title="Your Stats">
      <div class="stats">
        <Card variant="stat" class="s1"
          ><strong>{{ $store.getters.library.length }}</strong
          ><span>books in library</span></Card
        >
        <Card variant="stat-light" class="s2"
          ><strong>{{
            $store.getters.library.reduce((n, b) => n + (b.number_of_pages_median || 0), 0)
          }}</strong
          ><span>pages in total</span></Card
        >
        <Card variant="stat" class="s3"
          ><strong>{{ $store.getters.favorites.length }}</strong
          ><span>favorites</span></Card
        >
        <Card variant="stat-light" class="s4"
          ><strong>{{ $store.getters.numberBooksRated }}</strong
          ><span>books rated</span></Card
        >
        <Card variant="stat" class="s5"
          ><strong>{{
            (isNaN($store.getters.averageRating) ? 0 : $store.getters.averageRating) + '/5'
          }}</strong
          ><span>average rating</span></Card
        >
      </div>

      <Card v-if="$store.getters.favorites.length" variant="accent" title="Your favorite book">
        <div class="book">
          <img
            v-if="$store.getters.favorites[0].cover_i"
            class="book-cover"
            :src="
              'https://covers.openlibrary.org/b/id/' +
              $store.getters.favorites[0].cover_i +
              '-M.jpg'
            "
            :alt="$store.getters.favorites[0].title"
          />
          <div v-else class="book-cover book-cover-empty">No cover</div>
          <div class="book-info">
            <h3 class="book-title">
              {{ $store.getters.favorites[0].title
              }}<template v-if="$store.getters.favorites[0].author_name">
                - {{ $store.getters.favorites[0].author_name.join(', ') }}</template
              >
            </h3>
            <p class="book-text" v-if="$store.getters.favorites[0].first_publish_year">
              First published in {{ $store.getters.favorites[0].first_publish_year }}
            </p>
            <div class="book-foot">
              <span v-if="$store.getters.favorites[0].ratings_average" class="stars">
                <span
                  v-for="i in 5"
                  :key="i"
                  :class="{ on: i <= Math.round($store.getters.favorites[0].ratings_average) }"
                  >★</span
                >
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Card>
  </template>
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
.stats {
  display: grid;
  grid-template-columns: 1fr 0.8fr 1fr;
  gap: 8px;
}
.stats strong {
  font-size: 1.9rem;
  line-height: 1.1;
  font-weight: 600;
}
.stats span {
  font-size: 0.65rem;
}
.stats .s2 strong {
  color: #0075ff;
}
.stats .s4 strong {
  color: #0075ff;
}
.stats .s4 {
  grid-column: 1;
}
.stats .s5 {
  grid-column: 2 / 4;
}
</style>
