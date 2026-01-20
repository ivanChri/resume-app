<script setup lang="ts">
  const props = defineProps<{
    title:string
    itemId:string
    itemIndex:number
    active:boolean
    showToolbar:boolean
  }>()
  defineEmits<{
    (e:'onToggle',index:number):void
    (e:'openAlert',itemId:string):void
  }>()
</script>

<template>
   <div class="w-full rounded-lg mb-2 flex flex-col gap-2 border border-gray-400">
    <div class="border w-full border-gray-200 rounded-lg overflow-hidden">
      <button
        class="w-full flex justify-between items-center p-4 text-left font-medium bg-gray-50 hover:bg-gray-100 cursor-pointer"
        @click="$emit('onToggle',itemIndex)">
        <span>{{ title || '( Not Specified )' }}</span>
        <svg 
          class="w-5 h-5 transition-transform duration-300" 
          :class="{ 'rotate-180': active }"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <Transition name="accordion">
       <div v-if="active" class="p-2 bg-white">
         <slot></slot>
       </div>
      </Transition>
    </div>
    <div v-if="showToolbar" class="button-container p-1">
      <button @click="$emit('openAlert',itemId)" class="delete-button p-1 text-center rounded-md border border-red-400 bg-red-300">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.4s ease-out;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}
</style>