import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import SignIn from '@/components/SignIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    ,
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn
    }
  ]
})
