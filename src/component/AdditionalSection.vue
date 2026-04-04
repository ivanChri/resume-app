<script setup lang="ts">
 import { ref } from 'vue';
 import type { optionalFinalizationComponentStatus } from '../utils/types/component.interface';
 const emit = defineEmits<{
   (e:'add',key:string,name:string):void
 }>()
 const optionalComponentStatus = ref<optionalFinalizationComponentStatus>({
  portofolio:false,
  courses:false,
  language:false,
  volunteering:false,
  additionalInformation:false
 })
 const additionalButtonLabel = [
  {key:'Portofolio / Personal Project',componentName:'portofolio'},
  {key:'Courses',componentName:'courses'},
  {key:'Languages',componentName:'language'},
  {key:'Comunity volunteering',componentName:'volunteering'},
  {key:'Additional Information',componentName:'additionalInformation'}
 ]
 function toggleOptionalComponentStatus(key:string):void{
  const itemKey = key as keyof optionalFinalizationComponentStatus
  optionalComponentStatus.value[itemKey] = !optionalComponentStatus.value[itemKey]
 }
 function add(key:string,name:string):void{
  emit('add',key,name)
 }
 defineExpose({toggleOptionalComponentStatus})
</script>

<template>
 <div class="p-1">
  <h2 class="text-lg my-2">Additional Section</h2>
  <div class="button-container grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
    <button v-for="(item,index) in additionalButtonLabel" 
     class="p-2 border border-gray-500 bg-gray-50 rounded-md cursor-pointer text-left lg:text-center hover:bg-gray-300 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
     :key="index"
     @click="add(item.key,item.componentName)"
     :disabled="optionalComponentStatus[item.componentName as keyof optionalFinalizationComponentStatus]">
      {{ item.key }}
    </button>
  </div>
  </div>
</template>