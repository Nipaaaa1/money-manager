<script setup lang="ts">
const colorMode = useColorMode()
const isOpen = ref(false)

const themes = [
  { value: 'system', label: 'System', icon: 'lucide:monitor' },
  { value: 'light', label: 'Light', icon: 'lucide:sun' },
  { value: 'dark', label: 'Dark', icon: 'lucide:moon' }
]

const currentTheme = computed(() => themes.find(t => t.value === colorMode.preference) || themes[0])

const selectTheme = (theme: string) => {
  colorMode.preference = theme
  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <button 
      @click.stop="isOpen = !isOpen"
      class="flex items-center gap-2 rounded-full bg-white dark:bg-gray-800 px-4 py-2 text-xs font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100"
    >
      <Icon :name="currentTheme.icon" class="h-4 w-4 text-teal-600 dark:text-teal-400" />
      <span class="uppercase">{{ currentTheme.label }}</span>
      <Icon name="lucide:chevron-down" class="h-3 w-3 text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" />
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
        v-if="isOpen"
        class="absolute right-0 mt-2 w-36 origin-top-right rounded-2xl bg-white dark:bg-gray-800 p-2 shadow-xl border border-gray-100 dark:border-gray-700 z-[70]"
      >
        <button 
          v-for="theme in themes"
          :key="theme.value"
          @click="selectTheme(theme.value)"
          class="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-colors"
          :class="colorMode.preference === theme.value ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'"
        >
          <div class="flex items-center gap-2">
            <Icon :name="theme.icon" class="h-4 w-4" />
            <span>{{ theme.label.toUpperCase() }}</span>
          </div>
          <Icon v-if="colorMode.preference === theme.value" name="lucide:check" class="h-3 w-3" />
        </button>
      </div>
    </Transition>
    
    <!-- Overlay to close dropdown -->
    <div 
      v-if="isOpen" 
      @click="isOpen = false" 
      class="fixed inset-0 z-[60]"
    ></div>
  </div>
</template>
