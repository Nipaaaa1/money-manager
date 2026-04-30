<script setup lang="ts">
import { ref, computed } from 'vue'

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

const { locale, setLocale } = useI18n()

const showSetup = computed(() => isLoaded.value && transactions.value.length === 0 && initialBalance.value === 0)
const isResetDialogOpen = ref(false)

const toggleLocale = () => {
  setLocale(locale.value === 'en' ? 'id' : 'en')
}

const handleResetClick = () => {
  isResetDialogOpen.value = true
}

const handleConfirmReset = () => {
  resetData()
  isResetDialogOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4 font-sans text-gray-800 pb-20">
    <div class="mx-auto max-w-md space-y-4">
      <!-- Language Switcher -->
      <div class="flex justify-end">
        <button 
          @click="toggleLocale"
          class="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm hover:bg-gray-50 transition-all border border-gray-100"
        >
          <Icon name="lucide:languages" class="h-4 w-4 text-teal-600" />
          <span class="uppercase">{{ locale }}</span>
        </button>
      </div>

      <InitialBalanceModal 
        v-if="showSetup"
        @set="setInitialBalance"
      />

      <ConfirmDialog
        :is-open="isResetDialogOpen"
        :title="$t('dialog.reset_title')"
        :message="$t('dialog.reset_message')"
        :confirm-text="$t('dialog.confirm')"
        :cancel-text="$t('dialog.cancel')"
        @confirm="handleConfirmReset"
        @cancel="isResetDialogOpen = false"
      />

      <BalanceHeader 
        :balance="balance" 
        :format-currency="formatCurrency" 
        @reset="handleResetClick"
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
