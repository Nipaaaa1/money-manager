<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  currency: 'IDR' | 'USD'
}>()

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
  <section class="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm transition-colors">
    <h2 class="mb-4 text-lg font-bold text-gray-800 dark:text-gray-100">{{ $t('form.title') }}</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">{{ $t('form.description') }}</label>
          <input
            v-model="description"
            type="text"
            :placeholder="$t('form.desc_placeholder')"
            class="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-3 text-sm text-gray-800 dark:text-gray-100 focus:border-teal-500 focus:ring-teal-500 outline-none transition-all"
            required
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">{{ $t('form.amount') }}</label>
          <input
            v-model.number="amount"
            type="number"
            :step="currency === 'IDR' ? '1' : '0.01'"
            placeholder="0"
            class="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-3 text-sm text-gray-800 dark:text-gray-100 focus:border-teal-500 focus:ring-teal-500 outline-none transition-all"
            required
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">{{ $t('form.type') }}</label>
          <div class="grid grid-cols-2 gap-3">
            <label 
              class="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all"
              :class="type === 'income' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400'"
            >
              <input v-model="type" type="radio" value="income" class="hidden" />
              <Icon name="lucide:trending-up" class="h-4 w-4" />
              <span class="text-sm font-bold">{{ $t('app.income') }}</span>
            </label>
            <label 
              class="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all"
              :class="type === 'expense' ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400' : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400'"
            >
              <input v-model="type" type="radio" value="expense" class="hidden" />
              <Icon name="lucide:trending-down" class="h-4 w-4" />
              <span class="text-sm font-bold">{{ $t('app.expense') }}</span>
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="w-full rounded-xl bg-teal-600 p-3 text-sm font-bold text-white shadow-lg shadow-teal-100 dark:shadow-none hover:bg-teal-700 active:scale-95 transition-all"
      >
        {{ $t('form.button') }}
      </button>
    </form>
  </section>
</template>
