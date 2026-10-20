<script setup>
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
import RatingPanel from '@/components/RatingPanel.vue'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore()

const STATE_LABELS = ['Not reading', 'Reading', 'Finished']

const work = ref(null)
const loading = ref(true)
const showRatingPanel = ref(false)

const workKey = computed(() => '/works/' + route.params.id)

const entry = computed(() =>
  store.getters.libraryDetails.find((item) => item.book.key === workKey.value),
)

const book = computed(
  () => entry.value?.book ?? store.getters.items.find((item) => item.key === workKey.value) ?? null,
)

const title = computed(() => book.value?.title ?? work.value?.title ?? null)

const description = computed(() => {
  const raw = work.value?.description
  if (!raw) return ''
  return typeof raw === 'string' ? raw : (raw.value ?? '')
})

const coverId = computed(() => book.value?.cover_i ?? work.value?.covers?.[0] ?? null)

const details = computed(() => {
  const b = book.value ?? {}
  const rows = [
    ['Author', b.author_name?.join(', ')],
    ['First published', b.first_publish_year],
    ['Languages', b.language?.slice(0, 5).join(', ').toUpperCase()],
  ]
  return rows.filter(([, value]) => value)
})

async function loadWork(id) {
  loading.value = true
  work.value = null
  try {
    const response = await fetch(`https://openlibrary.org/works/${id}.json`)
    if (response.ok) work.value = await response.json()
  } catch {
    work.value = null
  }
  loading.value = false
}

watch(() => route.params.id, loadWork, { immediate: true })

function changeBookState() {
  const newState = entry.value.state === 1 ? 2 : 1
  store.commit('setBookState', { book: entry.value.book, newState })
  if (newState === 2) showRatingPanel.value = true
}

function toggleFavorite() {
  store.commit(
    entry.value.favorite ? 'removeBookFromFavorites' : 'addBookToFavorites',
    entry.value.book,
  )
}
</script>

<template>
  <div class="back">
    <Button variant="accent" @click="router.back()">Back</Button>
  </div>

  <p v-if="!title && loading" class="empty">Loading...</p>
  <p v-else-if="!title" class="empty">This book could not be found.</p>

  <template v-else>
    <h1 class="page-title">{{ title }}</h1>

    <Card>
      <div class="cover-wrap">
        <img
          v-if="coverId"
          class="cover"
          :src="'https://covers.openlibrary.org/b/id/' + coverId + '-L.jpg'"
          :alt="title"
        />
        <div v-else class="cover cover-empty">No cover</div>
      </div>

      <dl v-if="details.length" class="details">
        <div v-for="[label, value] in details" :key="label" class="detail-row">
          <dt>{{ label }}</dt>
          <dd>{{ value }}</dd>
        </div>
      </dl>
    </Card>

    <Card title="Description">
      <p v-if="description" class="description">{{ description }}</p>
      <p v-else-if="loading" class="muted">Loading...</p>
      <p v-else class="muted">No description available.</p>
    </Card>

    <Card title="Your library">
      <template v-if="entry">
        <p class="line">Status: {{ STATE_LABELS[entry.state] }}</p>
        <template v-if="entry.rating != -1">
          <div class="stars">
            <span v-for="i in 5" :key="i" :class="{ on: i <= entry.rating }">★</span>
          </div>
          <p v-if="entry.note" class="description">{{ entry.note }}</p>
        </template>
        <div class="actions">
          <Button variant="alert" @click="store.commit('removeBookFromLibrary', entry.book)"
            >Remove</Button
          >
          <Button @click="changeBookState">
            {{ entry.state === 1 ? 'Mark as finished' : 'Mark as reading' }}
          </Button>
          <Button variant="secondary" @click="toggleFavorite">
            {{ entry.favorite ? 'Remove from favorites' : 'Add to favorites' }}
          </Button>
        </div>
      </template>
      <template v-else>
        <p class="line">This book is not in your library.</p>
        <Button v-if="book" variant="secondary" @click="store.commit('addBookToLibrary', book)"
          >Add to your library</Button
        >
      </template>
    </Card>

    <RatingPanel v-if="showRatingPanel && entry" :entry="entry" @done="showRatingPanel = false" />
  </template>
</template>

<style scoped>
.back {
  margin-bottom: 16px;
}
.page-title {
  margin: 0 0 20px;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 400;
}
.empty {
  margin: 0;
  font-size: 0.8rem;
}
.cover-wrap {
  display: flex;
  justify-content: center;
}
.cover {
  width: 160px;
  height: 240px;
  object-fit: cover;
  border: 2px solid #4d86d6;
  border-radius: 14px;
  background: #e3eefa;
}
.cover-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #4d86d6;
}
.rating-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.muted {
  margin: 0;
  font-size: 0.75rem;
}
.details {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.8rem;
}
.detail-row dt {
  font-weight: 700;
}
.detail-row dd {
  margin: 0;
  text-align: right;
}
.description {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.45;
  white-space: pre-line;
}
.tags {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tags li {
  padding: 3px 10px;
  border: 1px solid #5b8fd0;
  border-radius: 10px;
  background: #eef7ff;
  font-size: 0.7rem;
}
.line {
  margin: 0;
  font-size: 0.8rem;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
