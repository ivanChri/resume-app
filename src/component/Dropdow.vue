<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  options:string[],
  selectedOption:string,
  itemId:string
}>()
const emit = defineEmits(['onUpdate'])
const isOpen = ref<boolean>(false)
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
function onUpdate(optionValue:string):void{
  emit('onUpdate',props.itemId,optionValue)
  toggleDropdown()
}
</script>

<template>
  <div class="w-full max-w-md">
    <div
      @click="toggleDropdown"
      class="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none cursor-pointer transition-all duration-200 flex justify-between items-center"
      :class="{
        'ring-2 ring-blue-500 border-blue-500': isOpen,
        'hover:border-gray-400': !isOpen
      }"
    >
      <span class="truncate mr-1">{{ selectedOption || 'Select Option' }}</span>
      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-150 ease-in"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-show="isOpen" class="absolute right-6 z-10 mt-2 max-w-sm w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
        <div v-for="(option, index) in options"
         :key="index"
         @click="onUpdate(option)"
         class="p-3 cursor-pointer transition-colors duration-150 hover:bg-blue-50 hover:text-blue-700"
         :class="{'bg-blue-50 text-blue-700': selectedOption === option,'border-b border-gray-200': index !== options.length - 1}">
          {{ option }}
        </div>
      </div>
    </transition>
  </div>
</template>