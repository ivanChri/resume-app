<script setup lang="ts">
 defineProps<{
  loading:boolean
 }>()
</script>

<template>
  <Teleport to="body">
  <div 
    v-if="loading"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
  >
    <div class="bg-white p-8 md:p-10 rounded-md shadow-xl flex flex-col items-center justify-center w-full max-w-xs md:max-w-sm transition-all">
      <div class="relative flex items-center justify-center">
        <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <div class="mt-5 text-center">
        <p class="text-gray-700 font-medium text-lg tracking-wide">
          Generating PDF
        </p>
        <p class="text-gray-400 text-sm mt-1">
          Please wait a moment...
        </p>
      </div>
    </div>
  </div>
  </Teleport>
</template>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>