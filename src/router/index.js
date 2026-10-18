import Favorites from '@/pages/Favorites.vue'
import Home from '@/pages/Home.vue'
import Library from '@/pages/Library.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/library',
      component: Library,
    },
    {
      path: '/favorites',
      component: Favorites,
    },
  ],
})

export default router
