<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  currency: 'IDR' | 'USD'
}>()

const emit = defineEmits<{
  (e: 'set', amount: number, currency: 'IDR' | 'USD'): void
}>()

const initialAmount = ref<number | null>(null)
const selectedCurrency = ref<'IDR' | 'USD'>(props.currency)

const handleSubmit = () => {
  if (initialAmount.value === null) return
  emit('set', initialAmount.value, selectedCurrency.value)
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
    <div class="w-full max-w-sm rounded-3xl bg-white dark:bg-gray-800 p-8 shadow-2xl transition-colors">
      <div class="mb-6 text-center">
        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400">
          <Icon name="lucide:wallet" class="h-8 w-8" />
        </div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ $t('onboarding.welcome') }}</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ $t('onboarding.set_balance') }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-2 ml-1">{{ $t('onboarding.currency') }}</label>
            <div class="grid grid-cols-2 gap-3">
              <button 
                type="button"
                @click="selectedCurrency = 'IDR'"
                class="flex items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all font-bold text-sm"
                :class="selectedCurrency === 'IDR' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400' : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-500'"
              >
                IDR
              </button>
              <button 
                type="button"
                @click="selectedCurrency = 'USD'"
                class="flex items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all font-bold text-sm"
                :class="selectedCurrency === 'USD' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400' : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-500'"
              >
                USD
              </button>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-2 ml-1">{{ $t('onboarding.label') }}</label>
            <input
              v-model.number="initialAmount"
              type="number"
              :step="selectedCurrency === 'IDR' ? '1' : '0.01'"
              :placeholder="$t('onboarding.placeholder')"
              class="w-full rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4 text-center text-xl font-bold text-gray-800 dark:text-gray-100 focus:border-teal-500 focus:ring-0 outline-none transition-all"
              required
              autofocus
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full rounded-2xl bg-teal-600 py-4 text-lg font-bold text-white shadow-xl shadow-teal-100 dark:shadow-none hover:bg-teal-700 active:scale-95 transition-all"
        >
          {{ $t('onboarding.button') }}
        </button>
      </form>
    </div>
  </div>
</template>
