<script setup lang="ts">
import type { Transaction } from '~/composables/useTransactions'

defineProps<{
  transactions: Transaction[]
  formatCurrency: (val: number) => string
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <section class="space-y-3">
    <h2 class="text-lg font-bold px-2">History</h2>
    <div v-if="transactions.length === 0" class="text-center py-8 text-gray-400 text-sm">
      No transactions yet.
    </div>
    <div
      v-for="t in transactions"
      :key="t.id"
      class="group flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md"
    >
      <div class="flex items-center space-x-3">
        <div 
          class="h-10 w-10 flex items-center justify-center rounded-full text-lg"
          :class="t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'"
        >
          {{ t.type === 'income' ? '+' : '-' }}
        </div>
        <div>
          <p class="font-bold text-gray-700 leading-tight">{{ t.description }}</p>
          <p class="text-[10px] text-gray-400 uppercase font-medium">{{ t.date }}</p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <p 
          class="font-bold text-right"
          :class="t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'"
        >
          {{ t.type === 'income' ? '' : '-' }}{{ formatCurrency(t.amount) }}
        </p>
        <button 
          @click="emit('delete', t.id)"
          class="text-gray-300 hover:text-rose-500 transition-colors p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
