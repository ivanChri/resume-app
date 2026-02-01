<script setup lang="ts">
 import { ref } from 'vue';
 const isOpen = ref(false)
 const emit = defineEmits<{
  (e:'confirm'):void
  (e:'closeEvent'):void
 }>()
 const open = ():void => {
  isOpen.value = true
 }
 const confirmStatus = ():void => {
  emit('confirm')
  close()
 }
 const close = ():void => {
  emit('closeEvent')
  isOpen.value = false
 }
 defineExpose({open})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div class="flex items-center gap-3 mb-4">
          <div class="text-3xl text-yellow-500">⚠️</div>
          <h2 class="text-lg font-semibold text-gray-800">
           <slot name="header">Konfirmasi Penghapusan</slot>
          </h2>
        </div>
        <p class="text-sm text-gray-600 mb-6">
          <slot name="body">
            Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.
          </slot>
        </p>
        <div class="flex justify-end gap-3">
          <button @click="close" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
            Batal
          </button>
          <button @click="confirmStatus" class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
            Hapus
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>