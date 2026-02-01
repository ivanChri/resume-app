<script setup lang="ts">
  import { ref,computed,defineAsyncComponent,useTemplateRef } from 'vue';
  import BiodataForm from './BiodataForm.vue';
  import SocialMediaForm from './SocialMediaForm.vue';
  import SkillsForm from './SkillsForm.vue';
  import SummaryForm from './SummaryForm.vue';
  import FinalizationForm from './FinalizationForm.vue';
  import GenericList from './GenericList.vue';
  import { genericConfigGenerator } from '../utils/genericConfig';
  import { useUserValidationStore } from '../store/userValidation.store';
  const asyncAlert = defineAsyncComponent(() => import('../component/Alert.vue'))
  const alertRef = useTemplateRef('alertRef')
  const componentIndex = ref<number>(0)
  const validation = useUserValidationStore()
  const genericConfig = genericConfigGenerator()
  const components = [
   {
    name:'Biodata',
    buttonName:'Personal Info',
    component:BiodataForm,
    props:{},
    add:() => {},
    delete:() => {}
   },
   {
    name:'experience',
    buttonName:'Work Experience',
    component:GenericList,
    props:genericConfig['experience'].props,
    add:genericConfig['experience'].emit.addData,
    delete:genericConfig['experience'].emit.deleteData
   },
   {
    name:'education',
    buttonName:'Education',
    component:GenericList,
    props:genericConfig['education'].props,
    add:genericConfig['education'].emit.addData,
    delete:genericConfig['education'].emit.deleteData
   },
   {
    name:'socialMedia',
    buttonName:'Social Media',
    component:SocialMediaForm,
    props:{},
    add:() => {},
    delete:() => {}
   },
   {
    name:'skills',
    buttonName:'Skills',
    component:SkillsForm,
    props:{},
    add:() => {},
    delete:() => {}
   },
   {
    name:'summary',
    buttonName:'Profesional Summary',
    component:SummaryForm,
    props:{},
    add:() => {},
    delete:() => {}
   },
   {
    name:'finalization',
    buttonName:'finish',
    component:FinalizationForm,
    props:{},
    add:() => {},
    delete:() => {}
   }
 ]
  const nextButtonLabel = computed(() => {
   return components[componentIndex.value + 1]?.buttonName || 'Download'
  })
  function next():void{
    if(componentIndex.value < components.length - 1){
      componentIndex.value++
    }else{
      printPdf()
    }
  }
  function back():void{
    if(componentIndex.value > 0){
      componentIndex.value--
    }
  }
  function printPdf():void{
   if(!validation.validateAllData){
    alertRef.value?.open()
   }else{
    alert('printed') 
   }
  }
</script>

<template>
   <div class="@container flex flex-col gap-2">
     <asyncAlert ref="alertRef">
       <template #header>Konfirmasi Pengunduhan</template>
       <template #body>Data Belum Lengkap Apakah Anda Yakin Untuk Mendownloadnya ?</template>
     </asyncAlert>
     <div class="component-container border rounded-md p-1">
       <component 
        :key="components[componentIndex].name" 
        :is="components[componentIndex].component"
        v-bind="components[componentIndex].props"
        @add="components[componentIndex].add"
        @delete="components[componentIndex].delete"></component>
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