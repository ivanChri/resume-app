<script setup lang="ts">
 import { ref,computed } from 'vue';
 defineProps<{
  disabledButton:boolean
 }>()
 const emit = defineEmits<{
   (e:'onUpdate',data:string):void
 }>()
 const currentYear = ref<number>(new Date().getFullYear())
 const selectedMonth = ref<string>('')
 const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
 const selectedOption = computed<string>(() => {
   if(!selectedMonth.value && currentYear.value) return ''
   return `${selectedMonth.value}, ${currentYear.value}`
 })
 function updateSelectedMonth(month:string):void{
   const index = months.indexOf(month)
   if(index !== -1) {
    selectedMonth.value = month
    emit('onUpdate',selectedOption.value)
   }
 }
</script>

<template>
 <div class="month-picker-container w-full">
    <div class="month-picker p-1 flex flex-col gap-3">
     <div class="year-container border-1 border-gray-300 rounded-md text-center flex justify-around p-1">
       <button class="prev-btn text-xl" @click="currentYear--">&larr;</button>
       <h3>{{ currentYear }}</h3>
       <button class="next-btn" @click="currentYear++">&#8594;</button>
     </div>
     <div class="Month grid grid-cols-3 gap-3 p-1">
      <button v-for="(month,index) in months" 
        class="rounded-md p-1 border-1 border-gray-300 text-center cursor-pointer hover:bg-gray-200 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed" 
        :disabled="disabledButton"
        :key="index"
        @click="updateSelectedMonth(month)">{{ month }}</button>
      </div>
    </div>
 </div>
</template>