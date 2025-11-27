<script setup lang="ts">
  import { ref,computed } from 'vue';
  import BiodataForm from './BiodataForm.vue';
  import SocialMediaForm from './SocialMediaForm.vue';
  import SkillsForm from './SkillsForm.vue';
  import SummaryForm from './SummaryForm.vue';
  import FinalizationForm from './FinalizationForm.vue';
  import GenericList from './GenericList.vue';
  import { genericConfigProps } from '../utils/genericConfig';
  import { useUserValidationStore } from '../store/userValidation.store';
  const componentIndex = ref<number>(0)
  const validation = useUserValidationStore()
  const components = [
   {
    name:'Biodata',
    buttonName:'Personal Info',
    component:BiodataForm,
    props:{}
   },
   {
    name:'experience',
    buttonName:'Work Experience',
    component:GenericList,
    props:genericConfigProps['experience']
   },
   {
    name:'education',
    buttonName:'Education',
    component:GenericList,
    props:genericConfigProps['education']
   },
   {
    name:'socialMedia',
    buttonName:'Social Media',
    component:SocialMediaForm,
    props:{}
   },
   {
    name:'skills',
    buttonName:'Skills',
    component:SkillsForm,
    props:{}
   },
   {
    name:'summary',
    buttonName:'Profesional Summary',
    component:SummaryForm,
    props:{}
   },
   {
    name:'finalization',
    buttonName:'finish',
    component:FinalizationForm,
    props:{}
   }
 ]
  const nextButtonLabel = computed(() => {
   return components[componentIndex.value + 1]?.buttonName || 'Download'
  })
  function next():void{
    if(componentIndex.value < components.length - 1){
      componentIndex.value++
    }else{
      console.log(validation.validateAllData)
    }
  }
  function back():void{
    if(componentIndex.value > 0){
      componentIndex.value--
    }
  }
</script>

<template>
   <div class="@container flex flex-col gap-2">
     <div class="component-container border rounded-md p-1">
       <component :key="components[componentIndex].name" :is="components[componentIndex].component" v-bind="components[componentIndex].props"></component>
     </div>
     <div class="button-container bg-slate-700 rounded-md  p-2 flex items-center justify-between">
       <button v-if="componentIndex > 0" class="border-2 rounded-md p-1 text-center" @click="back">
        Back
       </button>
       <div class="info-container p-1 flex gap-5">
         <span v-for="(value,index) in components" :key="value.name" :class="{'border-blue-500':index == componentIndex}" class="border-1 p-2 rounded-full transition-all duration-200"></span>
       </div>
       <button class="border-2 rounded-md p-1 text-center" @click="next">
        Next : {{ nextButtonLabel }}
      </button>
     </div>
   </div>
</template>