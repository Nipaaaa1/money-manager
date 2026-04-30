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
      <Icon name="lucide:trash-2" class="h-5 w-5" />
    </button>
    <h1 class="text-sm font-medium uppercase tracking-wider text-gray-500">Total Balance</h1>
    <p class="mt-1 text-3xl font-bold" :class="balance >= 0 ? 'text-teal-600' : 'text-rose-600'">
      {{ formatCurrency(balance) }}
    </p>
  </header>
</template>
