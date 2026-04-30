import { ref, computed, onMounted, watch } from 'vue'

export interface Transaction {
  id: number
  description: string
  amount: number
  type: 'income' | 'expense'
  date: string
}

export const useTransactions = () => {
  const transactions = ref<Transaction[]>([])

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
  const addTransaction = (description: string, amount: number, type: 'income' | 'expense') => {
    const newTransaction: Transaction = {
      id: Date.now(),
      description,
      amount,
      type,
      date: new Date().toLocaleDateString(),
    }

    transactions.value.unshift(newTransaction)
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

  return {
    transactions,
    totalIncome,
    totalExpense,
    balance,
    addTransaction,
    deleteTransaction,
    formatCurrency
  }
}
