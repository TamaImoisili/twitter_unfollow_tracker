<template>
  <div class="text-3xl">Home Page</div>
  <ButtonComponent class="mt-2" label="Go To Login" @clicked="$router.push({ name: 'Login' })" />
</template>

<script lang="ts">
// Component Definition
import ButtonComponent from '@/components/ButtonComponent.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'HomePage'
})
</script>

<script setup lang="ts">
// Home Page Logic
</script>
