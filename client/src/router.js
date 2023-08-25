import Home from './components/Home.vue'
import SignIn from './components/SignIn.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
           name: 'Home',
           component: Home,
           path: '/'
        },
        {
           name: 'SignIn',
           component: SignIn,
           path: '/sign-in'
        }
   ]
  });

export default router;