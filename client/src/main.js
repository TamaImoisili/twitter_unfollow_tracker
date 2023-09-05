import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import state from './state'

createApp(App).use(state).use(router).mount('#app')
