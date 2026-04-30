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
const isDonationDialogOpen = ref(false)
const isLangDropdownOpen = ref(false)

const handleLocaleSelect = (lang: 'en' | 'id') => {
  setLocale(lang)
  isLangDropdownOpen.value = false
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
      <!-- Header Actions -->
      <div class="flex justify-between items-center relative z-50">
        <button 
          @click="isDonationDialogOpen = true"
          class="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm hover:bg-gray-50 transition-all border border-gray-100 text-teal-600"
        >
          <Icon name="lucide:heart" class="h-4 w-4" />
          <span>{{ $t('donation.button') }}</span>
        </button>

        <!-- Language Dropdown -->
        <div class="relative">
          <button 
            @click.stop="isLangDropdownOpen = !isLangDropdownOpen"
            class="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm hover:bg-gray-50 transition-all border border-gray-100"
          >
            <Icon name="lucide:languages" class="h-4 w-4 text-teal-600" />
            <span class="uppercase">{{ locale }}</span>
            <Icon name="lucide:chevron-down" class="h-3 w-3 text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': isLangDropdownOpen }" />
          </button>

          <!-- Dropdown Menu -->
          <Transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-[-10px]"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-[-10px]"
          >
            <div 
              v-if="isLangDropdownOpen"
              class="absolute right-0 mt-2 w-36 origin-top-right rounded-2xl bg-white p-2 shadow-xl border border-gray-100 z-[70]"
            >
              <button 
                @click="handleLocaleSelect('en')"
                class="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-colors"
                :class="locale === 'en' ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'"
              >
                <span>ENGLISH</span>
                <Icon v-if="locale === 'en'" name="lucide:check" class="h-3 w-3" />
              </button>
              <button 
                @click="handleLocaleSelect('id')"
                class="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-colors"
                :class="locale === 'id' ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'"
              >
                <span>INDONESIA</span>
                <Icon v-if="locale === 'id'" name="lucide:check" class="h-3 w-3" />
              </button>
            </div>
          </Transition>
          
          <!-- Overlay to close dropdown -->
          <div 
            v-if="isLangDropdownOpen" 
            @click="isLangDropdownOpen = false" 
            class="fixed inset-0 z-[60] bg-black/5"
          ></div>
        </div>
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

      <DonationDialog
        :is-open="isDonationDialogOpen"
        @close="isDonationDialogOpen = false"
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
