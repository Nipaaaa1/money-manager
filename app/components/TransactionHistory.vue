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
    <h2 class="text-lg font-bold px-2 text-gray-800 dark:text-gray-100">{{ $t('app.history') }}</h2>
    <div v-if="transactions.length === 0" class="flex flex-col items-center justify-center py-12 px-4 rounded-3xl bg-white/50 dark:bg-gray-800/50 border-2 border-dashed border-gray-200 dark:border-gray-700 transition-colors">
      <div class="h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
        <Icon name="lucide:receipt-text" class="h-8 w-8 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 class="text-gray-600 dark:text-gray-300 font-bold mb-1">{{ $t('app.no_transactions') }}</h3>
      <p class="text-gray-400 dark:text-gray-500 text-xs text-center max-w-[200px] leading-relaxed">
        {{ $t('app.no_transactions_subtitle') }}
      </p>
    </div>
    <div
      v-for="t in transactions"
      :key="t.id"
      class="group flex items-center justify-between rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-sm transition-all hover:shadow-md"
    >
      <div class="flex items-center space-x-3">
        <div 
          class="h-10 w-10 flex items-center justify-center rounded-full"
          :class="t.type === 'income' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'"
        >
          <Icon :name="t.type === 'income' ? 'lucide:arrow-up-right' : 'lucide:arrow-down-right'" class="h-5 w-5" />
        </div>
        <div>
          <p class="font-bold text-gray-700 dark:text-gray-200 leading-tight">{{ t.description }}</p>
          <p class="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-medium">{{ t.date }}</p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <p 
          class="font-bold text-right"
          :class="t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'"
        >
          {{ t.type === 'income' ? '' : '-' }}{{ formatCurrency(t.amount) }}
        </p>
        <button 
          @click="emit('delete', t.id)"
          class="text-gray-300 dark:text-gray-600 hover:text-rose-500 transition-colors p-1"
        >
          <Icon name="lucide:trash-2" class="h-5 w-5" />
        </button>
      </div>
    </div>
  </section>
</template>
