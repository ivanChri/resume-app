<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div ref="sidebarRef" class="w-64 overflow-auto hide-scrollbar bg-blue-100">
      <div class="h-[2000px] p-4">Konten Sidebar Panjang</div>
    </div>

    <!-- Konten utama -->
    <div class="flex-1 overflow-auto bg-gray-200">
      <div class="h-[2000px] p-4">Konten Utama Panjang</div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const sidebarRef = ref(null)

function onGlobalScroll(e) {
  if (sidebarRef.value) {
    sidebarRef.value.scrollTop += e.deltaY
  }
}

onMounted(() => {
  window.addEventListener('wheel', onGlobalScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('wheel', onGlobalScroll)
})
</script>

<style scoped>
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}
</style>
