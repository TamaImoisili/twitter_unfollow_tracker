import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { ServerKey } from './models/injectionKeys'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030'
})

app.provide(ServerKey, axiosInstance)

app.mount('#app')
