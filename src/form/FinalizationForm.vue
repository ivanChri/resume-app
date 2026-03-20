<script setup lang="ts">
 import { ref,defineAsyncComponent,useTemplateRef } from 'vue';
 import type { optionalFinalizationComponentStatus } from '../utils/component.interface';
 import { useComponentStore } from '../store/component.store';
 import { genericConfigGenerator } from '../utils/genericConfig';
 import Accordion from '../component/Accordion.vue';
 import { getOptionalDataResetHandler } from '../utils/utility';
 const activeIndex = ref<number | null>(null)
 const currentId = ref<string | null>(null)
 const alertRef = useTemplateRef('alertRef')
 const store = useComponentStore()
 const genericConfig = genericConfigGenerator()
 const asyncGenericComponent = defineAsyncComponent(() => import('./GenericList.vue'))
 const asyncAlert = defineAsyncComponent(() => import('../component/Alert.vue'))
 const optionalComponentStatus = ref<optionalFinalizationComponentStatus>({
  awards:false,
  portofolio:false,
  courses:false,
  language:false,
  volunteering:false,
  additionalInformation:false
 })
 const additionalButonLabel = [
  {key:'Portofolio / Personal Project',componentName:'portofolio'},
  {key:'Courses',componentName:'courses'},
  {key:'Languages',componentName:'language'},
  {key:'Comunity volunteering',componentName:'volunteering'},
  {key:'Additional Information',componentName:'additionalInformation'}
 ]
const components:{[key:string]:any} = {
  biodata:{
   component:defineAsyncComponent(() => import('./BiodataForm.vue')),
   props:{},
   add:() => {},
   delete:() => {}
  },
  experience:{
   component:asyncGenericComponent,
   props:genericConfig['experience'].props,
   add:genericConfig['experience'].emit.addData,
   delete:genericConfig['experience'].emit.deleteData
  },
  education:{
   component:asyncGenericComponent,
   props:genericConfig['education'].props,
   add:genericConfig['education'].emit.addData,
   delete:genericConfig['education'].emit.deleteData
  },
  summary:{
   component:defineAsyncComponent(() => import('./SummaryForm.vue')),
   props:{},
   add:() => {},
   delete:() => {}
  },
  socialMedia:{
   component:defineAsyncComponent(() => import('./SocialMediaForm.vue')),
   props:{},
   add:() => {},
   delete:() => {}
  },
  skills:{
   component:defineAsyncComponent(() => import('./SkillsForm.vue')),
   props:{},
   add:() => {},
   delete:() => {}
  },
  portofolio:{
    component:asyncGenericComponent,
    props:genericConfig['portofolio'].props,
    add:genericConfig['portofolio'].emit.addData,
    delete:genericConfig['portofolio'].emit.deleteData
  },
  language:{
   component:defineAsyncComponent(() => import('./LanguageForm.vue')),
   props:{},
   add:() => {},
   delete:() => {}
  },
  volunteering:{
   component:asyncGenericComponent,
   props:genericConfig['volunteering'].props,
   add:genericConfig['volunteering'].emit.addData,
   delete:genericConfig['volunteering'].emit.deleteData
  },
  courses:{
   component:asyncGenericComponent,
   props:genericConfig['course'].props,
   add:genericConfig['course'].emit.addData,
   delete:genericConfig['course'].emit.deleteData
  },
  additionalInformation:{
   component:defineAsyncComponent(() => import('./AdditionalInformation.vue')),
   props:{},
   add:() => {},
   delete:() => {}
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
 function openAlert(itemId:string):void{
   alertRef.value?.open()
   currentId.value = itemId
 }
 function confirmDelete(){
   if(currentId.value) deleteAdditionalComponent(currentId.value)
 }
 function deleteAdditionalComponent(itemId:string):void{
   const index = store.finalizationComponent.findIndex((item) => item.id == itemId)
   const currentComponentName = store.finalizationComponent[index].componentName
   if(index !== -1){
    getOptionalDataResetHandler(currentComponentName)
    toggleOptionalComponentStatus(currentComponentName)
    store.finalizationComponent.splice(index,1)
   }
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
    <asyncAlert ref="alertRef" @confirm="confirmDelete" @close-event="() => currentId = null"></asyncAlert>
    <div class="content-container">
    <div v-for="(item,index) in store.finalizationComponent" class="p-1">
     <Accordion 
      :key="item.key"
      :title="item.key"
      :item-id="item.id"
      :item-index="index"
      :active="index === activeIndex"
      :showToolbar="!item.isRequired"
      @on-toggle="toggle"
      @open-alert="openAlert">
       <component 
        :is="components[item.componentName].component" 
        v-bind="components[item.componentName].props"
        @add="components[item.componentName].add"
        @delete="components[item.componentName].delete"></component>
      </Accordion>
    </div>
    </div>
    <div class="footer p-1">
     <h2 class="text-lg my-2">Additional Section</h2>
     <div class="button-container grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
      <button v-for="(item,index) in additionalButonLabel" 
       class="p-2 border-1 rounded-md cursor-pointer text-left lg:text-center disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
       :key="index"
       @click="addOptionalComponent(item.key,item.componentName)"
       :disabled="optionalComponentStatus[item.componentName as keyof optionalFinalizationComponentStatus]">
        {{ item.key }}
      </button>
     </div>
    </div>
  </section>
</template>