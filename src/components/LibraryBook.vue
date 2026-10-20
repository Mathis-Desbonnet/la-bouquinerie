<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Button from './Button.vue'
import Card from './Card.vue'
import RatingPanel from './RatingPanel.vue'

const props = defineProps({
  entry: { type: Object, required: true },
})

const store = useStore()

const STATE_LABELS = ['Not reading', 'Reading', 'Finished']

const showRatingPanel = ref(false)

const STAR_PATH =
  'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z'

function changeBookState() {
  const book = props.entry.book
  if (props.entry.state === 1) {
    store.commit('setBookState', { book, newState: 2 })
    showRatingPanel.value = true
  } else {
    store.commit('setBookState', { book, newState: 1 })
  }
}
</script>

<template>
  <Card variant="plain">
    <div class="book">
      <img
        v-if="entry.book.cover_i"
        class="book-cover"
        :src="'https://covers.openlibrary.org/b/id/' + entry.book.cover_i + '-M.jpg'"
        :alt="entry.book.title"
      />
      <div v-else class="book-cover book-cover-empty">No cover</div>
      <div class="book-info">
        <h3 class="book-title">
          <RouterLink :to="'/book/' + entry.book.key.split('/').pop()" class="book-link">{{
            entry.book.title
          }}</RouterLink
          ><template v-if="entry.book.author_name">
            - {{ entry.book.author_name.join(', ') }}</template
          >
        </h3>
        <p class="book-text" v-if="entry.book.first_publish_year">
          First published in {{ entry.book.first_publish_year }}
        </p>
        <div v-if="entry.rating != -1">
          <span v-for="i in 5" :key="i">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              :fill="i <= entry.rating ? '#facc15' : 'none'"
              viewBox="0 0 16 16"
              stroke="#000"
              stroke-width="1.8"
              stroke-linejoin="round"
            >
              <path :d="STAR_PATH" />
            </svg>
          </span>
          <p class="book-text">{{ entry.note }}</p>
        </div>
        <div class="book-foot">
          <Button variant="alert" @click="store.commit('removeBookFromLibrary', entry.book)"
            >Remove</Button
          >
          <Button @click="changeBookState">{{ STATE_LABELS[entry.state] }}</Button>
          <Button
            variant="bookmark"
            :title="entry.favorite ? 'Remove from favorites' : 'Add to favorites'"
            @click="
              store.commit(
                entry.favorite ? 'removeBookFromFavorites' : 'addBookToFavorites',
                entry.book,
              )
            "
          >
            <svg
              width="20"
              height="26"
              viewBox="0 0 20 26"
              stroke="#000"
              stroke-width="1.8"
              stroke-linejoin="round"
              :fill="entry.favorite ? '#facc15' : 'none'"
            >
              <path d="M3 2h14v21l-7-5-7 5z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  </Card>

  <RatingPanel v-if="showRatingPanel" :entry="entry" @done="showRatingPanel = false" />
</template>

<style scoped>
.book-link {
  color: inherit;
  text-decoration: none;
}
.book-link:hover {
  text-decoration: underline;
}
</style>
