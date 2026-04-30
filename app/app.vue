<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Transaction {
  id: number
  description: string
  amount: number
  type: 'income' | 'expense'
  date: string
}

const transactions = ref<Transaction[]>([])
const description = ref('')
const amount = ref<number | null>(null)
const type = ref<'income' | 'expense'>('expense')

// Computed totals
const totalIncome = computed(() => {
  return transactions.value
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)
})

const totalExpense = computed(() => {
  return transactions.value
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)
})

const balance = computed(() => totalIncome.value - totalExpense.value)

// Actions
const addTransaction = () => {
  if (!description.value || !amount.value || amount.value <= 0) return

  const newTransaction: Transaction = {
    id: Date.now(),
    description: description.value,
    amount: amount.value,
    type: type.value,
    date: new Date().toLocaleDateString(),
  }

  transactions.value.unshift(newTransaction)
  
  // Reset form
  description.value = ''
  amount.value = null
}

const deleteTransaction = (id: number) => {
  transactions.value = transactions.value.filter((t) => t.id !== id)
}

// Persistence
onMounted(() => {
  const saved = localStorage.getItem('mm_transactions')
  if (saved) {
    transactions.value = JSON.parse(saved)
  }
})

watch(
  transactions,
  (newVal) => {
    localStorage.setItem('mm_transactions', JSON.stringify(newVal))
  },
  { deep: true }
)

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val)
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
    <div class="mx-auto max-w-md space-y-4">
      <!-- Header & Balance -->
      <header class="rounded-2xl bg-white p-6 shadow-sm text-center">
        <h1 class="text-sm font-medium uppercase tracking-wider text-gray-500">Total Balance</h1>
        <p class="mt-1 text-3xl font-bold" :class="balance >= 0 ? 'text-teal-600' : 'text-rose-600'">
          {{ formatCurrency(balance) }}
        </p>
      </header>

      <!-- Income/Expense Summary -->
      <div class="grid grid-cols-2 gap-4">
        <div class="rounded-2xl bg-white p-4 shadow-sm border-b-4 border-emerald-500">
          <p class="text-xs font-semibold text-gray-400 uppercase">Income</p>
          <p class="text-lg font-bold text-emerald-600">{{ formatCurrency(totalIncome) }}</p>
        </div>
        <div class="rounded-2xl bg-white p-4 shadow-sm border-b-4 border-rose-500">
          <p class="text-xs font-semibold text-gray-400 uppercase">Expense</p>
          <p class="text-lg font-bold text-rose-600">{{ formatCurrency(totalExpense) }}</p>
        </div>
      </div>

      <!-- Add Transaction Form -->
      <section class="rounded-2xl bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-lg font-bold">Add Transaction</h2>
        <form @submit.prevent="addTransaction" class="space-y-4">
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

      <!-- History -->
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
              @click="deleteTransaction(t.id)"
              class="text-gray-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
/* Custom transitions and scrollbar can go here if needed */
body {
  background-color: #f3f4f6;
}
</style>
