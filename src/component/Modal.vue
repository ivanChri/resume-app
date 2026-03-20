<script setup lang="ts">
import { ref, watch } from 'vue';
const isOpen = ref(false)
const open = (): void => {
  isOpen.value = true
}
const close = (): void => {
  isOpen.value = false
}
watch(isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
defineExpose({ open, close })
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div v-if="isOpen" class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center overflow-hidden">
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          @click="close"
        ></div>

        <div 
          class="relative flex flex-col bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:w-[95%] sm:max-w-4xl sm:rounded-2xl shadow-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 pt-[calc(1rem+env(safe-area-inset-top))] sm:pt-4">
            <div class="font-semibold text-lg text-gray-800">
              <slot name="header"></slot>
            </div>
            <button @click="close" class="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex-1 px-6 py-4 min-h-[500px] overflow-y-auto overscroll-contain bg-white text-gray-600">
            <slot></slot>
          </div>
          <div class="sticky bottom-0 z-10 px-6 py-4 bg-gray-50/80 backdrop-blur-md border-t border-gray-100 flex justify-end gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-4">
            <slot name="footer">
              <button 
                @click="close" 
                class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 font-medium transition-colors"
              >
                Tutup
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Opsional: Memperhalus scrollbar untuk desktop */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 10px;
}
</style>
