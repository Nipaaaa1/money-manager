<script setup lang="ts">
const { 
  transactions, 
  totalIncome, 
  totalExpense, 
  balance, 
  initialBalance,
  isLoaded,
  setInitialBalance,
  resetData,
  addTransaction, 
  deleteTransaction, 
  formatCurrency 
} = useTransactions()

const showSetup = computed(() => isLoaded.value && transactions.value.length === 0 && initialBalance.value === 0)
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
    <div class="mx-auto max-w-md space-y-4">
      <InitialBalanceModal 
        v-if="showSetup"
        @set="setInitialBalance"
      />

      <BalanceHeader 
        :balance="balance" 
        :format-currency="formatCurrency" 
        @reset="resetData"
      />

      <SummaryCards 
        :total-income="totalIncome" 
        :total-expense="totalExpense" 
        :format-currency="formatCurrency" 
      />

      <TransactionForm @add="addTransaction" />

      <TransactionHistory 
        :transactions="transactions" 
        :format-currency="formatCurrency" 
        @delete="deleteTransaction" 
      />
    </div>
  </div>
</template>

<style>
body {
  background-color: #f3f4f6;
}
</style>
