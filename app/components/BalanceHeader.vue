<script setup lang="ts">
defineProps<{
  balance: number
  formatCurrency: (val: number) => string
}>()
</script>

<template>
  <header class="rounded-2xl bg-white p-6 shadow-sm text-center">
    <h1 class="text-sm font-medium uppercase tracking-wider text-gray-500">Total Balance</h1>
    <p class="mt-1 text-3xl font-bold" :class="balance >= 0 ? 'text-teal-600' : 'text-rose-600'">
      {{ formatCurrency(balance) }}
    </p>
  </header>
</template>
