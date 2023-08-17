<template>
  <div class="">
    <div class="text-3xl text-slate-500">Login Page</div>

    <ButtonComponent class="mt-2" label="Sign In" @clicked="handleSignIn" />
  </div>
</template>

<script lang="ts">
import { ServerKey } from '@/models/injectionKeys'
import ButtonComponent from '@/components/ButtonComponent.vue'
import type { AxiosInstance } from 'axios'
import { defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'LoginPage'
})
</script>

<script setup lang="ts">
// Login Page Logic

const router = useRouter()
const axios = inject(ServerKey) as AxiosInstance

const handleSignIn = () => {
  // console.log('Sign In Clicked')
  axios
    .get('/health')
    .then(({ data }) => {
      console.log(data)
      // This is how you route
      router.push({ name: 'Home' })
    })
    .catch((err) => console.log(err))
}
</script>
