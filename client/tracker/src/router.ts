import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  // NOTE: Page Names MUST BE UNIQUE
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/HomePage.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login/LoginPage.vue')
    }
  ]
})

export default router
