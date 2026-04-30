<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'add', description: string, amount: number, type: 'income' | 'expense'): void
}>()

const description = ref('')
const amount = ref<number | null>(null)
const type = ref<'income' | 'expense'>('expense')

const handleSubmit = () => {
  if (!description.value || !amount.value || amount.value <= 0) return
  
  emit('add', description.value, amount.value, type.value)
  
  // Reset form
  description.value = ''
  amount.value = null
}
</script>

<template>
  <section class="rounded-2xl bg-white p-6 shadow-sm">
    <h2 class="mb-4 text-lg font-bold">Add Transaction</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Description</label>
          <input
            v-model="description"
            type="text"
            placeholder="e.g. Salary, Coffee"
            class="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm focus:border-teal-500 focus:ring-teal-500 outline-none transition-all"
            required
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Amount</label>
          <input
            v-model.number="amount"
            type="number"
            placeholder="0"
            class="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm focus:border-teal-500 focus:ring-teal-500 outline-none transition-all"
            required
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase mb-2">Type</label>
          <div class="grid grid-cols-2 gap-3">
            <label 
              class="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all"
              :class="type === 'income' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-100 bg-gray-50 text-gray-500'"
            >
              <input v-model="type" type="radio" value="income" class="hidden" />
              <Icon name="lucide:trending-up" class="h-4 w-4" />
              <span class="text-sm font-bold">Income</span>
            </label>
            <label 
              class="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all"
              :class="type === 'expense' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-gray-100 bg-gray-50 text-gray-500'"
            >
              <input v-model="type" type="radio" value="expense" class="hidden" />
              <Icon name="lucide:trending-down" class="h-4 w-4" />
              <span class="text-sm font-bold">Expense</span>
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="w-full rounded-xl bg-teal-600 p-3 text-sm font-bold text-white shadow-lg shadow-teal-100 hover:bg-teal-700 active:scale-95 transition-all"
      >
        Add Transaction
      </button>
    </form>
  </section>
</template>
