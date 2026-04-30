<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const btcAddress = 'bc1qpnuawtjx0htufuyjennndzp9mvgas52xy0sdg0'
const ethAddress = '0x6BE6f2930F95CFc9f6a14ABD648DD62219EeCd8d'

const copiedBtc = ref(false)
const copiedEth = ref(false)

const copyToClipboard = async (text: string, type: 'btc' | 'eth') => {
  try {
    await navigator.clipboard.writeText(text)
    if (type === 'btc') {
      copiedBtc.value = true
      setTimeout(() => copiedBtc.value = false, 2000)
    } else {
      copiedEth.value = true
      setTimeout(() => copiedEth.value = false, 2000)
    }
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-60 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div class="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <div class="mb-6 text-center">
              <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <Icon name="lucide:heart" class="h-7 w-7" />
              </div>
              <h2 class="text-xl font-bold text-gray-800">{{ $t('donation.title') }}</h2>
              <p class="mt-2 text-sm text-gray-500 leading-relaxed">{{ $t('donation.message') }}</p>
            </div>

            <div class="space-y-4 mb-6">
              <!-- BTC -->
              <div class="group relative rounded-2xl border-2 border-gray-50 bg-gray-50 p-4 transition-all hover:border-teal-100">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Bitcoin (BTC)</span>
                  <button 
                    @click="copyToClipboard(btcAddress, 'btc')"
                    class="text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    <Icon :name="copiedBtc ? 'lucide:check' : 'lucide:copy'" class="h-4 w-4" />
                  </button>
                </div>
                <p class="break-all text-xs font-mono text-gray-600 leading-tight pr-6">
                  {{ btcAddress }}
                </p>
              </div>

              <!-- ETH -->
              <div class="group relative rounded-2xl border-2 border-gray-50 bg-gray-50 p-4 transition-all hover:border-teal-100">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Ethereum (ETH)</span>
                  <button 
                    @click="copyToClipboard(ethAddress, 'eth')"
                    class="text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    <Icon :name="copiedEth ? 'lucide:check' : 'lucide:copy'" class="h-4 w-4" />
                  </button>
                </div>
                <p class="break-all text-xs font-mono text-gray-600 leading-tight pr-6">
                  {{ ethAddress }}
                </p>
              </div>
            </div>

            <button
              @click="emit('close')"
              class="w-full rounded-2xl bg-gray-900 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-gray-800 active:scale-95 transition-all"
            >
              {{ $t('donation.close') }}
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
