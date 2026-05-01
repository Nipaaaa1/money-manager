<script setup lang="ts">
defineProps<{
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
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
      <div v-if="isOpen" class="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div class="w-full max-w-sm rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-2xl transition-colors">
            <div class="mb-6 text-center">
              <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500 dark:text-rose-400">
                <Icon name="lucide:alert-triangle" class="h-7 w-7" />
              </div>
              <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">{{ title }}</h2>
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ message }}</p>
            </div>

            <div class="flex flex-col gap-3">
              <button
                @click="emit('confirm')"
                class="w-full rounded-2xl bg-rose-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-100 dark:shadow-none hover:bg-rose-600 active:scale-95 transition-all"
              >
                {{ confirmText || 'Yes, Delete' }}
              </button>
              <button
                @click="emit('cancel')"
                class="w-full rounded-2xl bg-gray-50 dark:bg-gray-700 py-3.5 text-sm font-bold text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 active:scale-95 transition-all"
              >
                {{ cancelText || 'Cancel' }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
