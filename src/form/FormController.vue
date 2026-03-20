<script setup lang="ts">
<<<<<<< HEAD
  import { ref,computed,defineAsyncComponent,useTemplateRef,onUpdated } from 'vue';
=======
  import { ref,computed,defineAsyncComponent,useTemplateRef } from 'vue';
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
  import BiodataForm from './BiodataForm.vue';
  import SocialMediaForm from './SocialMediaForm.vue';
  import SkillsForm from './SkillsForm.vue';
  import SummaryForm from './SummaryForm.vue';
  import FinalizationForm from './FinalizationForm.vue';
  import GenericList from './GenericList.vue';
  import { genericConfigGenerator } from '../utils/genericConfig';
  import { useUserValidationStore } from '../store/userValidation.store';
  const asyncAlert = defineAsyncComponent(() => import('../component/Alert.vue'))
<<<<<<< HEAD
  const emit = defineEmits<{
    (e:'printPdf'):void
  }>()
=======
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
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
<<<<<<< HEAD
      checkData()
=======
      printPdf()
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
    }
  }
  function back():void{
    if(componentIndex.value > 0){
      componentIndex.value--
    }
  }
<<<<<<< HEAD
  function checkData():void{
   if(!validation.validateAllData){
    alertRef.value?.open()
   }else{
    printPdf()
   }
  }
  function printPdf(){
    emit('printPdf')
  }
  onUpdated(() => {
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  })
</script>

<template>
   <div class="@container flex flex-col gap-2 border-1 border-gray-400 rounded-md p-1">
     <asyncAlert ref="alertRef" @confirm="printPdf">
       <template #header>Konfirmasi Pengunduhan</template>
       <template #body>Beberapa Data Belum Lengkap Apakah Anda Yakin Untuk Mendownloadnya ?</template>
       <template #confirmButtonName>Download</template>
      </asyncAlert>
     <div class="component-container min-h-[300px] md:min-h-[400px] lg:min-h-[300px] rounded-md p-1">
=======
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
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
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
<<<<<<< HEAD
       <div class="info-container p-1 hidden lg:block">
         <span v-for="(value,index) in components" :key="value.name" :class="{'border-blue-500':index == componentIndex}" class="border-1 inline-block mx-1 p-2 rounded-full transition-all duration-200"></span>
=======
       <div class="info-container p-1 flex gap-5">
         <span v-for="(value,index) in components" :key="value.name" :class="{'border-blue-500':index == componentIndex}" class="border-1 p-2 rounded-full transition-all duration-200"></span>
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
       </div>
       <button class="border-2 rounded-md p-1 text-center" @click="next">
        Next : {{ nextButtonLabel }}
      </button>
     </div>
   </div>
</template>