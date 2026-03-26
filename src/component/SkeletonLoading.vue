<script setup lang="ts">
const props = defineProps({
  rows: {
    type: Number,
    default: 2
  },
  rowHeight: {
    type: String,
    default: '20px'
  },
  gap: {
    type: String,
    default: '16px' 
  },
  minHeight: {
    type: String,
    default: 'auto'
  }
})
const rowStyle = (index:number) => {
  return {
    height: props.rowHeight,
    marginBottom: index < props.rows ? props.gap : '0px'
  }
}
</script>

<template>
  <div 
    class="w-full flex flex-col" 
    :style="{ minHeight: minHeight }"
    aria-hidden="true"
  >
    <div 
      v-for="n in rows" 
      :key="n" 
      class="relative overflow-hidden bg-gray-200 rounded-md w-full"
      :style="rowStyle(n)"
    >
      <div class="shimmer-effect"></div>
    </div>
  </div>
</template>

<style scoped>
.shimmer-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>