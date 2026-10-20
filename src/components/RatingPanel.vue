<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Button from './Button.vue'
import Card from './Card.vue'
import Modal from './Modal.vue'
import Select from './Select.vue'
import TextArea from './TextArea.vue'

const props = defineProps({
  entry: { type: Object, required: true },
})
const emit = defineEmits(['done'])

const store = useStore()

const ratingOptions = [0, 1, 2, 3, 4, 5].map((n) => ({ value: n, label: String(n) }))

const rating = ref(Math.max(props.entry.rating, 0))
const ratingDesc = ref(props.entry.note)

function addRating() {
  store.commit('setBookReview', {
    book: props.entry.book,
    rating: parseInt(rating.value),
    reviewDesc: ratingDesc.value,
  })
  emit('done')
}
</script>

<template>
  <Modal>
    <Card title="Rate your book">
      Your rating
      <Select v-model="rating" :options="ratingOptions" variant="light" />
      Your description
      <TextArea
        v-model="ratingDesc"
        placeholder="It was so incredible..."
        :rows="5"
        variant="light"
      />
      <Button variant="primary" @click="addRating">Rate!</Button>
    </Card>
  </Modal>
</template>
