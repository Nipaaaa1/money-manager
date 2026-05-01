<script setup lang="ts">
import { ref, computed } from 'vue'

const { 
  transactions, 
  totalIncome, 
  totalExpense, 
  balance, 
  initialBalance,
  currency,
  isLoaded,
  setInitialBalance,
  setCurrency,
  resetData,
  addTransaction, 
  deleteTransaction, 
  formatCurrency 
} = useTransactions()

const { locale, setLocale, t } = useI18n()

useSeoMeta({
  title: () => t('app.title'),
  ogTitle: () => t('app.title'),
  description: () => t('app.description'),
  ogDescription: () => t('app.description'),
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('app.title'),
  twitterDescription: () => t('app.description'),
})

const showSetup = computed(() => isLoaded.value && transactions.value.length === 0 && initialBalance.value === 0)
const isResetDialogOpen = ref(false)
const isDonationDialogOpen = ref(false)
const isLangDropdownOpen = ref(false)
const isCurrencyDropdownOpen = ref(false)

const handleLocaleSelect = (lang: 'en' | 'id') => {
  setLocale(lang)
  isLangDropdownOpen.value = false
}

const handleCurrencySelect = (cur: 'IDR' | 'USD') => {
  setCurrency(cur)
  isCurrencyDropdownOpen.value = false
}

const handleResetClick = () => {
  isResetDialogOpen.value = true
}

const handleConfirmReset = () => {
  resetData()
  isResetDialogOpen.value = false
}

const handleInitialBalance = (amount: number, cur: 'IDR' | 'USD') => {
  setCurrency(cur)
  setInitialBalance(amount)
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 font-sans text-gray-800 dark:text-gray-100 pb-20 transition-colors duration-300">
    <div class="mx-auto max-w-md space-y-4">
      <!-- Header Actions -->
      <div class="flex justify-between items-center relative z-50">
        <div class="flex items-center gap-2">
          <button 
            @click="isDonationDialogOpen = true"
            class="flex items-center gap-2 rounded-full bg-white dark:bg-gray-800 px-3 py-2 text-[10px] font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-700 text-teal-600 dark:text-teal-400"
          >
            <Icon name="lucide:heart" class="h-3 w-3" />
            <span class="hidden xs:inline">{{ $t('donation.button') }}</span>
          </button>
          
          <ColorModePicker />
        </div>

        <div class="flex items-center gap-2">
          <!-- Currency Dropdown -->
          <div class="relative">
            <button 
              @click.stop="isCurrencyDropdownOpen = !isCurrencyDropdownOpen"
              class="flex items-center gap-2 rounded-full bg-white dark:bg-gray-800 px-3 py-2 text-[10px] font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100"
            >
              <Icon name="lucide:banknote" class="h-3 w-3 text-teal-600 dark:text-teal-400" />
              <span>{{ currency }}</span>
              <Icon name="lucide:chevron-down" class="h-2 w-2 text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': isCurrencyDropdownOpen }" />
            </button>

            <!-- Currency Dropdown Menu -->
            <Transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="opacity-0 scale-95 translate-y-[-10px]"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 translate-y-[-10px]"
            >
              <div 
                v-if="isCurrencyDropdownOpen"
                class="absolute right-0 mt-2 w-28 origin-top-right rounded-2xl bg-white dark:bg-gray-800 p-2 shadow-xl border border-gray-100 dark:border-gray-700 z-[70]"
              >
                <button 
                  @click="handleCurrencySelect('IDR')"
                  class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[10px] font-bold transition-colors"
                  :class="currency === 'IDR' ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'"
                >
                  <span>IDR</span>
                  <Icon v-if="currency === 'IDR'" name="lucide:check" class="h-3 w-3" />
                </button>
                <button 
                  @click="handleCurrencySelect('USD')"
                  class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[10px] font-bold transition-colors"
                  :class="currency === 'USD' ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'"
                >
                  <span>USD</span>
                  <Icon v-if="currency === 'USD'" name="lucide:check" class="h-3 w-3" />
                </button>
              </div>
            </Transition>
            
            <!-- Overlay to close dropdown -->
            <div 
              v-if="isCurrencyDropdownOpen" 
              @click="isCurrencyDropdownOpen = false" 
              class="fixed inset-0 z-[60]"
            ></div>
          </div>

          <!-- Language Dropdown -->
          <div class="relative">
            <button 
              @click.stop="isLangDropdownOpen = !isLangDropdownOpen"
              class="flex items-center gap-2 rounded-full bg-white dark:bg-gray-800 px-3 py-2 text-[10px] font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100"
            >
              <Icon name="lucide:languages" class="h-3 w-3 text-teal-600 dark:text-teal-400" />
              <span class="uppercase">{{ locale }}</span>
              <Icon name="lucide:chevron-down" class="h-2 w-2 text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': isLangDropdownOpen }" />
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
                class="absolute right-0 mt-2 w-32 origin-top-right rounded-2xl bg-white dark:bg-gray-800 p-2 shadow-xl border border-gray-100 dark:border-gray-700 z-[70]"
              >
                <button 
                  @click="handleLocaleSelect('en')"
                  class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[10px] font-bold transition-colors"
                  :class="locale === 'en' ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'"
                >
                  <span>ENGLISH</span>
                  <Icon v-if="locale === 'en'" name="lucide:check" class="h-3 w-3" />
                </button>
                <button 
                  @click="handleLocaleSelect('id')"
                  class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[10px] font-bold transition-colors"
                  :class="locale === 'id' ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'"
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
              class="fixed inset-0 z-[60]"
            ></div>
          </div>
        </div>
      </div>

      <InitialBalanceModal 
        v-if="showSetup"
        :currency="currency"
        @set="handleInitialBalance"
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

      <TransactionForm 
        :currency="currency"
        @add="addTransaction" 
      />

      <TransactionHistory 
        :transactions="transactions" 
        :format-currency="formatCurrency" 
        @delete="deleteTransaction" 
      />
    </div>
  </div>
</template>
