<script setup>
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
import LibraryBook from '@/components/LibraryBook.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <h1 class="page-title">Welcome back, François</h1>
  <Card title="Your Personal library">
    <p v-if="!$store.getters.library.length" class="empty">
      Your library is empty. Use the search tab to add a book.
    </p>
    <LibraryBook
      v-for="entry in $store.getters.libraryDetails.slice(0, 2)"
      :key="entry.book.key"
      :entry="entry"
    />
    <template #footer>
      <Button variant="accent" @click="router.push('/full-list')">See full list</Button>
    </template>
  </Card>

  <Card title="Your Stats">
    <div class="stats">
      <Card variant="stat" class="s1"
        ><strong>{{ $store.getters.library.length }}</strong
        ><span>books in library</span></Card
      >
      <Card variant="stat-light" class="s2"
        ><strong>{{
          $store.getters.libraryDetails.filter((obj) => obj.state == 2).length
        }}</strong
        ><span>total read</span></Card
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
