<script setup lang="ts">
 import { ref,defineAsyncComponent } from 'vue';
 import type { optionalFinalizationComponentStatus } from '../utils/component.interface';
 import { useComponentStore } from '../store/component.store';
 import { genericConfigGenerator } from '../utils/genericConfig';
 import { useUserValidationStore } from '../store/userValidation.store';
 import BiodataForm from './BiodataForm.vue';
 import GenericList from './GenericList.vue';
 import SummaryForm from './SummaryForm.vue';
 import SkillsForm from './SkillsForm.vue';
 import SocialMediaForm from './SocialMediaForm.vue';
 import Accordion from '../component/Accordion.vue';
 const activeIndex = ref<number | null>(null)
 const store = useComponentStore()
 const componentValidation = useUserValidationStore()
 const genericConfig = genericConfigGenerator()
 const optionalComponentStatus = ref<optionalFinalizationComponentStatus>({
  awards:false,
  portofolio:false,
  courses:false,
  language:false,
  volunteering:false,
  additionalInformation:false
 })
const components:{[key:string]:any} = {
  biodata:{
   component:BiodataForm,
   props:{}
  },
  experience:{
   component:GenericList,
   props:genericConfig['experience']
  },
  education:{
   component:GenericList,
   props:genericConfig['education']
  },
  summary:{
   component:SummaryForm,
   props:{}
  },
  socialMedia:{
   component:SocialMediaForm,
   props:{}
  },
  skills:{
   component:SkillsForm,
   props:{}
  },
  portofolio:{
    component:GenericList,
    props:genericConfig['portofolio']
  },
  language:{
   component:defineAsyncComponent(() => import('./LanguageForm.vue')),
   props:{}
  },
  volunteering:{
   component:GenericList,
   props:genericConfig['volunteering']
  },
  courses:{
   component:GenericList,
   props:genericConfig['course'] 
  },
  additionalInformation:{
   component:defineAsyncComponent(() => import('./AdditionalInformation.vue')),
   props:{}
  }
}
 function addOptionalComponent(key:string,componentName:string):void{
  const length = store.finalizationComponent.length + 1
  store.finalizationComponent.push({
    id:`component-${length}`,
    key,
    componentName,
    isRequired:false,
    order:length,
  })
  toggleOptionalComponentStatus(componentName)
 }
 function deleteAdditionalComponent(itemId:string):void{
   const index = store.finalizationComponent.findIndex((item) => item.id == itemId)
   toggleOptionalComponentStatus(store.finalizationComponent[index].componentName)
   if(index !== -1) store.finalizationComponent.splice(index,1)
 }
 function toggle(index:number):void {
  activeIndex.value = activeIndex.value === index ? null : index;
 }
 function toggleOptionalComponentStatus(key:string):void{
  const itemKey = key as keyof optionalFinalizationComponentStatus
  optionalComponentStatus.value[itemKey] = !optionalComponentStatus.value[itemKey]
 }
</script>

<template>
  <section class="finalization-container p-1 w-full flex flex-col gap-2 relative">
    <div v-for="(item,index) in store.finalizationComponent" class="border-1 rounded-md p-[3.5px] border-green-500" :class="{'border-2 border-orange-400 focus:outline-red-500':!componentValidation.validation[item.componentName]}">
     <Accordion 
      :key="item.key"
      :title="item.key"
      :item-id="item.id"
      :item-index="index"
      :active="index === activeIndex"
      :showToolbar="!item.isRequired"
      @on-toggle="toggle"
      @on-delete="deleteAdditionalComponent">
       <component :is="components[item.componentName].component" v-bind="components[item.componentName].props"></component>
      </Accordion>
    </div>
    <div class="footer p-1">
     <h2 class="text-lg my-2">Additional Section</h2>
     <div class="button-container grid grid-cols-2 gap-3 my-3">
      <button class="p-1 border-1 rounded-md cursor-pointer disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
       @click="addOptionalComponent('Portofolio / Personal Project','portofolio')"
       :disabled="optionalComponentStatus.portofolio">Personal Project</button>
      <button class="p-1 border-1 rounded-md cursor-pointer disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
       @click="addOptionalComponent('Courses','courses')"
       :disabled="optionalComponentStatus.courses">Courses</button>
      <button class="p-1 border-1 rounded-md cursor-pointer disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
       @click="addOptionalComponent('Languages','language')"
       :disabled="optionalComponentStatus.language">Languages</button>
      <button class="p-1 border-1 rounded-md cursor-pointer disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
       @click="addOptionalComponent('Comunity volunteering','volunteering')"
       :disabled="optionalComponentStatus.volunteering">Comunity volunteering</button>
      <button class="p-1 border-1 rounded-md cursor-pointer disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
      @click="addOptionalComponent('Additional Information','additionalInformation')">Additional Information</button>
     </div>
    </div>
  </section>
</template>