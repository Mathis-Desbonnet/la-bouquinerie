<script setup>
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
import Input from '@/components/Input.vue'
import LibraryBook from '@/components/LibraryBook.vue'
import Modal from '@/components/Modal.vue'
import Select from '@/components/Select.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const sortOptions = [
  { value: 'added', label: 'Date added' },
  { value: 'year', label: 'Year' },
  { value: 'name', label: 'Name' },
]
const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 0, label: 'Not reading' },
  { value: 1, label: 'Reading' },
  { value: 2, label: 'Finished' },
]

const search = ref('')
const sortBy = ref('added')
const showFilters = ref(false)
const favoritesOnly = ref(false)
const statusFilter = ref('all')

const activeFilterCount = computed(
  () => (favoritesOnly.value ? 1 : 0) + (statusFilter.value !== 'all' ? 1 : 0),
)

const visibleBooks = computed(() => {
  const query = search.value.trim().toLowerCase()

  const list = store.getters.libraryDetails.filter((entry) => {
    const { title = '', author_name = [] } = entry.book
    if (query && !`${title} ${author_name.join(' ')}`.toLowerCase().includes(query)) return false
    if (favoritesOnly.value && !entry.favorite) return false
    if (statusFilter.value !== 'all' && entry.state !== statusFilter.value) return false
    return true
  })

  if (sortBy.value === 'year') {
    list.sort(
      (a, b) => (b.book.first_publish_year ?? -Infinity) - (a.book.first_publish_year ?? -Infinity),
    )
  } else if (sortBy.value === 'name') {
    list.sort((a, b) =>
      a.book.title.localeCompare(b.book.title, undefined, { sensitivity: 'base' }),
    )
  }
  return list
})

function resetFilters() {
  favoritesOnly.value = false
  statusFilter.value = 'all'
}
</script>

<template>
  <h1 class="page-title">François' personal library</h1>
  <div class="toolbar">
    <Input v-model="search" placeholder="Search in library" class="toolbar-search" />
    <Select v-model="sortBy" :options="sortOptions" class="toolbar-sort" />
  </div>
  <div class="toolbar-sub">
    <span class="count">{{ visibleBooks.length }} / {{ $store.getters.library.length }} books</span>
    <Button variant="primary" @click="showFilters = true">
      Filters<template v-if="activeFilterCount"> ({{ activeFilterCount }})</template>
    </Button>
  </div>

  <Card title="Your Personal library">
    <p v-if="!$store.getters.library.length" class="empty">
      Your library is empty. Use the search tab to add a book.
    </p>
    <p v-else-if="!visibleBooks.length" class="empty">No book matches your search or filters.</p>
    <LibraryBook v-for="entry in visibleBooks" :key="entry.book.key" :entry="entry" />
    <template #footer>
      <Button variant="accent" @click="router.push('/')">Hide full list</Button>
    </template>
  </Card>

  <Modal v-if="showFilters" @close="showFilters = false">
    <Card title="Filters" has-close-button @close="showFilters = false">
      <label class="check">
        <input type="checkbox" v-model="favoritesOnly" />
        Favorites only
      </label>
      Reading status
      <Select v-model="statusFilter" :options="statusOptions" variant="light" />
      <Button variant="secondary" @click="resetFilters">Reset filters</Button>
    </Card>
  </Modal>
</template>

<style scoped>
.page-title {
  margin: 0 0 24px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 400;
}
.toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}
.toolbar-search {
  flex: 1;
  min-width: 0;
}
.toolbar-sort {
  width: 130px;
  flex-shrink: 0;
}
.toolbar-sub {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.count {
  font-size: 0.75rem;
}
.empty {
  margin: 0;
  font-size: 0.8rem;
}
.check {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.check input {
  width: 18px;
  height: 18px;
  accent-color: #0075ff;
  cursor: pointer;
}
</style>
