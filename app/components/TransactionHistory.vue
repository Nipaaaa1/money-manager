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
    <h2 class="text-lg font-bold px-2">{{ $t('app.history') }}</h2>
    <div v-if="transactions.length === 0" class="flex flex-col items-center justify-center py-12 px-4 rounded-3xl bg-white/50 border-2 border-dashed border-gray-200">
      <div class="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon name="lucide:receipt-text" class="h-8 w-8 text-gray-400" />
      </div>
      <h3 class="text-gray-600 font-bold mb-1">{{ $t('app.no_transactions') }}</h3>
      <p class="text-gray-400 text-xs text-center max-w-[200px] leading-relaxed">
        {{ $t('app.no_transactions_subtitle') }}
      </p>
    </div>
    <div
      v-for="t in transactions"
      :key="t.id"
      class="group flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md"
    >
      <div class="flex items-center space-x-3">
        <div 
          class="h-10 w-10 flex items-center justify-center rounded-full"
          :class="t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'"
        >
          <Icon :name="t.type === 'income' ? 'lucide:arrow-up-right' : 'lucide:arrow-down-right'" class="h-5 w-5" />
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
          <Icon name="lucide:trash-2" class="h-5 w-5" />
        </button>
      </div>
    </div>
  </section>
</template>
