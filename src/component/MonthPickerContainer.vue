<script setup lang="ts">
 import { ref,computed } from 'vue';
 import MonthPicker from './MonthPicker.vue';
 type MonthPickerConfig = {
  value:string | null,
  disable:boolean,
  onUpdate:(data:string) => void
 }
 const props = defineProps<{
   startDate:string | null,
   endDate:string | null
 }>()
 const emit = defineEmits<{
  (e:'updateStartDate',value:string):void,
  (e:'updateEndDate',value:string):void
 }>()
 const activeIndex = ref<number | null>(null)
 const showMonthPicker = ref<boolean>(false)
 function toggleMonthPicker(index:number):void{
  activeIndex.value = activeIndex.value === index ? null : index
  showMonthPicker.value = activeIndex.value === index
 }
 function resetMonthPicker():void{
    activeIndex.value = null
    showMonthPicker.value = false
  }
 const monthPickerOptions = computed<MonthPickerConfig[]>(() => [
    {
      value:props.startDate,
      disable:false,
      onUpdate:(data:string) => {
       if(data){
        emit('updateStartDate',data)
        toggleMonthPicker(0)
       }
      }
    },
    {
     value:props.endDate,
     disable:props.endDate === 'Present',
     onUpdate:(data:string) => {
      if(data){
       emit('updateEndDate',data)
       toggleMonthPicker(1)
      }
     }
    }
  ])
  function handleDateUpdate(data:string):void{
  if (activeIndex.value !== null) {
    monthPickerOptions.value[activeIndex.value].onUpdate(data)
  }
 }
 defineExpose({resetMonthPicker})
</script>

<template>
  <div class="container">
    <div class="option-container w-full flex gap-3 p-1 text-center">
      <button v-for="(item,index) in monthPickerOptions" 
       :key="index" 
       @click="toggleMonthPicker(index)"
       :disabled="item.disable"
       class="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none cursor-pointer transition-all duration-200 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed" 
       :class="{'ring-2 ring-blue-500 border-blue-500' : activeIndex === index}">
      <span class="font-thin text-md">{{ item.value || 'MM/YYYY' }}</span>
    </button>
    </div>
    <div v-if="showMonthPicker" class="month-picker-container z-10 absolute mt-15 p-1 max-w-sm w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-70 overflow-auto">
       <MonthPicker v-if="activeIndex !== null" @on-update="handleDateUpdate"></MonthPicker>
    </div>
  </div>
</template>