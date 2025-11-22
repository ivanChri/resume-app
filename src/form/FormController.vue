<script setup lang="ts">
  import { ref,computed } from 'vue';
  import BiodataForm from './BiodataForm.vue';
  import WorkExperienceForm from './WorkExperienceForm.vue';
  import EducationForm from './EducationForm.vue';
  import SocialMediaForm from './SocialMediaForm.vue';
  import SkillsForm from './SkillsForm.vue';
  import SummaryForm from './SummaryForm.vue';
  import FinalizationForm from './FinalizationForm.vue';
  import { useUserValidationStore } from '../store/userValidation.store';
  const componentIndex = ref<number>(0)
  const validation = useUserValidationStore()
  const component = [
    BiodataForm,
    WorkExperienceForm,
    EducationForm,
    SocialMediaForm,
    SkillsForm,
    SummaryForm,
    FinalizationForm
  ]
  const buttonName = [
    'Personal Info',
    'Work Experience',
    'Education',
    'Social Media',
    'Skills',
    'Profesional Summary',
    'Finish'
  ]
  const nextButtonLabel = computed(() => {
   return buttonName[componentIndex.value + 1] || 'Download'
  })
  function next():void{
    if(componentIndex.value < component.length - 1){
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
       <component :is="component[componentIndex]"></component>
     </div>
     <div class="button-container bg-slate-700 rounded-md  p-2 flex items-center justify-between">
       <button v-if="componentIndex > 0" class="border-2 rounded-md p-1 text-center" @click="back">
        Back
       </button>
       <div class="info-container p-1 flex gap-5">
         <span v-for="(value,index) in buttonName" :key="value" :class="{'border-blue-500':index == componentIndex}" class="border-1 p-2 rounded-full transition-all duration-200"></span>
       </div>
       <button class="border-2 rounded-md p-1 text-center" @click="next">
        Next : {{ nextButtonLabel }}
      </button>
     </div>
   </div>
</template>