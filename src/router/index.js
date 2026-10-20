import AddBook from '@/pages/AddBook.vue'
import BookDetail from '@/pages/BookDetail.vue'
import Favorites from '@/pages/Favorites.vue'
import FullList from '@/pages/FullList.vue'
import Home from '@/pages/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/full-list',
      component: FullList,
    },
    {
      path: '/book/:id',
      component: BookDetail,
    },
    {
      path: '/addBook',
      component: AddBook,
    },
    {
      path: '/favorites',
      component: Favorites,
    },
  ],
})

export default router
