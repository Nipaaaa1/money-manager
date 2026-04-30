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
      <div class="grid grid-cols-2 gap-4">
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
          <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Type</label>
          <select
            v-model="type"
            class="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm focus:border-teal-500 focus:ring-teal-500 outline-none transition-all appearance-none"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
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
