<script setup lang="ts">
  import { computed,useTemplateRef } from 'vue';
  import type { ParentType,fieldConfigData } from '../utils/types/component.interface';
  import type { employmentTypes } from '../utils/types/form.interface';
  import { getFieldConfig } from '../utils/utility/getFieldConfig.ts';
  import Dropdown from './Dropdown.vue';
  import MonthPickerContainer from './MonthPickerContainer.vue';
  const props = defineProps<{
    parent:ParentType
  }>()
  const monthPickerRef = useTemplateRef('monthPickerRef')
  const fieldConfigData = computed<fieldConfigData>(() => getFieldConfig(props.parent))
  const types:employmentTypes[] = ['Full-time','Part-time','Internship','Contract','Freelance']
  const titleModel = defineModel<string>('titleModel')
  const subModel = defineModel<string>('subModel')
  const startDateModel = defineModel<string | null>('startDateModel',{default:null})
  const endDateModel = defineModel<string | null>('endDateModel',{default:null})
  const cityModel = defineModel<string | null>('cityModel',{default:null})
  const linkModel = defineModel<string | null>('linkModel',{default:null})
  const employmentTypesModel = defineModel<string | null>('employmentTypesModel',{default:null})
  function setCurrentStartDate(value:string):void{
    startDateModel.value = value
  }
  function setCurrentEndDate(value:string):void{
    endDateModel.value = value
  }
  function updateEndDateToPresentValue(event:Event):void{
   const target = event.target as HTMLInputElement
   if(target.checked){
    endDateModel.value = 'Present'
    monthPickerRef.value?.resetMonthPicker()
   }else{
    endDateModel.value = ''
   }
  }
</script>

<template>
  <div class="accordion-content grid grid-cols-1 md:grid-cols-2 gap-y-1">
    <div class="flex title-container flex-col p-1 gap-3">
      <label class="font-semibold text-md" for="title">{{ fieldConfigData.title }}</label>
      <input type="text" v-model="titleModel" id="title" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
    </div>
    <div class="flex sub-container flex-col p-1 gap-3">
      <label class="font-semibold text-md" for="sub">{{ fieldConfigData.sub }}</label>
      <input type="text" v-model="subModel" id="sub" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
    </div>
    <div class="flex date-container flex-col p-1 gap-2 relative">
      <span class="font-semibold text-md">{{ fieldConfigData.labelName }}</span>
      <div v-if="fieldConfigData.useMonthPicker" class="flex flex-col gap-2">
        <MonthPickerContainer
         ref="monthPickerRef" 
         :start-date="startDateModel" 
         :end-date="endDateModel"
         @update-start-date="setCurrentStartDate"
         @update-end-date="setCurrentEndDate">
        </MonthPickerContainer>
       <div v-if="fieldConfigData.useMonthPickerStatus" class="status-button-container">
         <label class="relative flex justify-between items-center group p-1">
            {{ fieldConfigData.statusLabel }}
          <input type="checkbox" @change="updateEndDateToPresentValue" :checked="endDateModel === 'Present'" class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
          <span class="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
        </label>
       </div>
      </div>
    </div>
    <div class="flex flex-col p-1 gap-2 con">
      <div v-if="fieldConfigData.showCity" class="flex flex-col p-1 gap-2 city-container">
       <label class="font-semibold text-md" for="city">City</label>
       <input type="text" v-model="cityModel" id="city" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
      </div>
      <div v-if="fieldConfigData.showEmploymentType" class="dropdown container p-1 relative flex flex-col gap-2">
        <span class="font-semibold text-md">Employment Types</span>
        <Dropdown v-model:selected-option="employmentTypesModel" :options="types"></Dropdown>
      </div>
      <div v-if="fieldConfigData.showLink" class="flex flex-col p-1 gap-2 link-container">
       <label class="font-semibold text-md" for="link">Link</label>
       <input type="url" v-model="linkModel" id="link" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
      </div>
    </div>
    <div class="descriptionEditor-container col-span-1 md:col-span-2">
      <label class="font-semibold text-md mb-4" for="description">Description</label>
      <slot></slot>
    </div>
  </div>
</template>