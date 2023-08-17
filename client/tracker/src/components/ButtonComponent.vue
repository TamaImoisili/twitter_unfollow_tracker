<template>
  <div>
    <button
      class="border bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl w-full uppercase font-bold"
      @click="$emit('clicked')"
    >
      {{ label }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
}

type Emits = {
  (e: 'clicked'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
