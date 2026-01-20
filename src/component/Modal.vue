<script setup lang="ts">
 import { ref } from 'vue';
 const isOpen = ref(false)
 const open = () => {
  isOpen.value = true
 }
 const close = () => {
  isOpen.value = false
 }
defineExpose({open})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/50" @click="close"></div>
        <div class="relative bg-white shadow-lg flex flex-col w-full h-full sm:w-[90%] sm:max-w-4xl sm:h-[85vh] sm:rounded-xl">
          <div class="flex items-center gap-3 border-b border-blue-600 px-6 py-4">
            <slot name="header"></slot>
          </div>
          <div class="px-6 py-4 flex-1 overflow-y-auto">
            <slot></slot>
          </div>
          <div class="px-6 py-4 flex justify-end gap-2">
            <slot name="footer">
              <button @click="close" class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>