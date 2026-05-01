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
  const initialBalance = ref<number>(0)
  const currency = ref<'IDR' | 'USD'>('IDR')
  const isLoaded = ref(false)

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

  const balance = computed(() => initialBalance.value + totalIncome.value - totalExpense.value)

  // Actions
  const setInitialBalance = (amount: number) => {
    initialBalance.value = amount
    localStorage.setItem('mm_initial_balance', amount.toString())
  }

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

  const resetData = () => {
    transactions.value = []
    initialBalance.value = 0
    localStorage.removeItem('mm_transactions')
    localStorage.removeItem('mm_initial_balance')
  }

  const setCurrency = (val: 'IDR' | 'USD') => {
    currency.value = val
    localStorage.setItem('mm_currency', val)
  }

  // Persistence
  onMounted(() => {
    const savedTransactions = localStorage.getItem('mm_transactions')
    if (savedTransactions) {
      transactions.value = JSON.parse(savedTransactions)
    }

    const savedInitialBalance = localStorage.getItem('mm_initial_balance')
    if (savedInitialBalance) {
      initialBalance.value = parseFloat(savedInitialBalance)
    }

    const savedCurrency = localStorage.getItem('mm_currency') as 'IDR' | 'USD'
    if (savedCurrency) {
      currency.value = savedCurrency
    }
    
    isLoaded.value = true
  })

  watch(
    transactions,
    (newVal) => {
      localStorage.setItem('mm_transactions', JSON.stringify(newVal))
    },
    { deep: true }
  )

  const formatCurrency = (val: number) => {
    const locale = currency.value === 'IDR' ? 'id-ID' : 'en-US'
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency.value,
      maximumFractionDigits: currency.value === 'IDR' ? 0 : 2
    }).format(val)
  }

  return {
    transactions,
    initialBalance,
    currency,
    isLoaded,
    totalIncome,
    totalExpense,
    balance,
    setInitialBalance,
    setCurrency,
    addTransaction,
    deleteTransaction,
    resetData,
    formatCurrency,
  }
}
