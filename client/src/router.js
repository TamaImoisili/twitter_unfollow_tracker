import Home from './pages/Home.vue'
import SignIn from './pages/SignIn.vue'
import { createRouter, createWebHistory } from 'vue-router'
import state from './state'

const router = createRouter({
    history: createWebHistory(),
    routes: [
         {
            path: '/',
            name: 'root',
            component: Home,
            meta: { requiresAuth: true }, 
         },
        {
           path: '/',
           name: 'home',
           component: Home,
           meta: { requiresAuth: true }, 
        },
        {
           path: '/sign-in',
           name: 'signin',
           component: SignIn,
        }
   ]
  });

  router.beforeEach((to, from, next) => {
   if (to.matched.some((record) => record.meta.requiresAuth)) {
     if (!state.state.isAuthenticated) {
       // Redirect to the sign-in page or any other route as needed
       next({name:'signin'});
     } else {
       // Allow access to the route
       next();
     }
   } else {
     // For routes that don't require authentication, allow access
     next();
   }
 });

export default router;