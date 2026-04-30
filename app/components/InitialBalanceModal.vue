<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'set', amount: number): void
}>()

const initialAmount = ref<number | null>(null)

const handleSubmit = () => {
  if (initialAmount.value === null) return
  emit('set', initialAmount.value)
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
    <div class="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
      <div class="mb-6 text-center">
        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-3xl text-teal-600">
          💰
        </div>
        <h2 class="text-2xl font-bold text-gray-800">Welcome!</h2>
        <p class="text-sm text-gray-500 mt-2">Set your initial balance to get started.</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-xs font-semibold text-gray-400 uppercase mb-2 ml-1">Current Balance (IDR)</label>
          <input
            v-model.number="initialAmount"
            type="number"
            placeholder="e.g. 1000000"
            class="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 text-center text-xl font-bold focus:border-teal-500 focus:ring-0 outline-none transition-all"
            required
            autofocus
          />
        </div>
        
        <button
          type="submit"
          class="w-full rounded-2xl bg-teal-600 py-4 text-lg font-bold text-white shadow-xl shadow-teal-100 hover:bg-teal-700 active:scale-95 transition-all"
        >
          Let's Go!
        </button>
      </form>
    </div>
  </div>
</template>
