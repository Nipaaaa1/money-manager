<script setup lang="ts">
defineProps<{
  balance: number
  formatCurrency: (val: number) => string
}>()

const emit = defineEmits<{
  (e: 'reset'): void
}>()
</script>

<template>
  <header class="relative rounded-2xl bg-white p-6 shadow-sm text-center">
    <button 
      @click="emit('reset')"
      class="absolute top-4 right-4 text-gray-300 hover:text-rose-500 transition-colors p-1"
      title="Reset All Data"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
    <h1 class="text-sm font-medium uppercase tracking-wider text-gray-500">Total Balance</h1>
    <p class="mt-1 text-3xl font-bold" :class="balance >= 0 ? 'text-teal-600' : 'text-rose-600'">
      {{ formatCurrency(balance) }}
    </p>
  </header>
</template>
