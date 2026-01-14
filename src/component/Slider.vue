<script setup lang="ts">
 const selectedRangeModel = defineModel<number>('selectedRangeModel')
 const props = defineProps<{
   labels:string[],
 }>()
 function update(range:number):void{
  selectedRangeModel.value = range
 }
</script>

<template>
  <div class="w-full max-w-md mx-auto">
   <input type="range" min="0" :max="labels.length - 1" step="1" v-model.number="selectedRangeModel" class="w-full"/>
   <div class="flex justify-between mt-2">
      <button v-for="(label, index) in labels" :key="index" @click="update(index)"
        class="text-sm"  :class="selectedRangeModel === index ? 'text-blue-600' : 'text-gray-400'">
        <span>{{ label }}</span>
      </button>
    </div>
  </div>
</template>