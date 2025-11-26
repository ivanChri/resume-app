<script setup lang="ts">
  import { ref,computed } from 'vue';
  import BiodataForm from './BiodataForm.vue';
  import SocialMediaForm from './SocialMediaForm.vue';
  import SkillsForm from './SkillsForm.vue';
  import SummaryForm from './SummaryForm.vue';
  import FinalizationForm from './FinalizationForm.vue';
  import Generic from './Generic.vue';
  import { useUserValidationStore } from '../store/userValidation.store';
  import { useUserStore } from '../store/user.store';
  const userStore = useUserStore()
  const componentIndex = ref<number>(0)
  const validation = useUserValidationStore()
  const test = [{
    parent:'experience',
    data:userStore.experience,
    initialData:{
     id:'',
     jobTitle:'',
     employer:'',
     startDate:'',
     endDate:'',
     city:'',
     description:'',
    },
  },
  {
   parent:'education',
   data:userStore.education,
   initialData:{
    id:'',
    schoolName:'',
    degree:'',
    startDate:'',
    endDate:'',
    city:'',
    description:'',
   }
  }]
  const component = [
   {
    name:'Biodata',
    buttonName:'Personal Info',
    compt:BiodataForm,
    props:{}
   },
   {
    name:'experience',
    buttonName:'Work Experience',
    compt:Generic,
    props:test[componentIndex.value]
   },
   {
    name:'education',
    buttonName:'Education',
    compt:Generic,
    props:test[1]
   },
   {
    name:'socialMedia',
    buttonName:'Social Media',
    compt:SocialMediaForm,
    props:{}
   },
   {
    name:'skills',
    buttonName:'Skills',
    compt:SkillsForm,
    props:{}
   },
   {
    name:'summary',
    buttonName:'Profesional Summary',
    compt:SummaryForm,
    props:{}
   },
   {
    name:'finalization',
    buttonName:'finish',
    compt:FinalizationForm,
    props:{}
   }
 ]
  const nextButtonLabel = computed(() => {
   return component[componentIndex.value + 1]?.buttonName || 'Download'
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
       <component :key="component[componentIndex].name" :is="component[componentIndex].compt" v-bind="component[componentIndex].props"></component>
     </div>
     <div class="button-container bg-slate-700 rounded-md  p-2 flex items-center justify-between">
       <button v-if="componentIndex > 0" class="border-2 rounded-md p-1 text-center" @click="back">
        Back
       </button>
       <div class="info-container p-1 flex gap-5">
         <span v-for="(value,index) in component" :key="value.name" :class="{'border-blue-500':index == componentIndex}" class="border-1 p-2 rounded-full transition-all duration-200"></span>
       </div>
       <button class="border-2 rounded-md p-1 text-center" @click="next">
        Next : {{ nextButtonLabel }}
      </button>
     </div>
   </div>
</template>