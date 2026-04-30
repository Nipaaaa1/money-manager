<script setup lang="ts">
defineProps<{
  totalIncome: number
  totalExpense: number
  formatCurrency: (val: number) => string
}>()
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="rounded-2xl bg-white p-4 shadow-sm border-b-4 border-emerald-500">
      <p class="text-xs font-semibold text-gray-400 uppercase">{{ $t('app.income') }}</p>
      <p class="text-lg font-bold text-emerald-600">{{ formatCurrency(totalIncome) }}</p>
    </div>
    <div class="rounded-2xl bg-white p-4 shadow-sm border-b-4 border-rose-500">
      <p class="text-xs font-semibold text-gray-400 uppercase">{{ $t('app.expense') }}</p>
      <p class="text-lg font-bold text-rose-600">{{ formatCurrency(totalExpense) }}</p>
    </div>
  </div>
</template>
