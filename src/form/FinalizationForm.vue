<script setup lang="ts">
 import { defineAsyncComponent,useTemplateRef,onMounted } from 'vue';
 import { useComponentStore } from '../store/component.store';
 import { useUserValidationStore } from '../store/userValidation.store';
 import { genericConfigGenerator } from '../utils/config/genericConfig';
 import { getOptionalDataResetHandler } from '../utils/utility/utility';
 import type { componentRegisrty } from '../utils/types/component.interface';
 import SkeletonLoading from '../component/SkeletonLoading.vue';
 import AccordionList from '../component/AccordionList.vue';
 import AdditionalSection from '../component/AdditionalSection.vue';
 const additionalSectionRef = useTemplateRef('additionalSectionRef')
 const store = useComponentStore()
 const genericConfig = genericConfigGenerator()
 const validationStore = useUserValidationStore()
 const optionalStatusValue = ['portofolio','courses','language','volunteering','additionalInformation']
 const asyncGenericComponent = defineAsyncComponent(() => import('./GenericList.vue'))
 const components:componentRegisrty = {
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
   additionalSectionRef.value?.toggleOptionalComponentStatus(componentName)
   validationStore.addOptionalValidation(componentName)
 }
 function deleteAdditionalComponent(itemId:string):void{
   const index = store.finalizationComponent.findIndex((item) => item.id == itemId)
   const currentComponentName = store.finalizationComponent[index].componentName
   if(index !== -1){
    getOptionalDataResetHandler(currentComponentName)
    additionalSectionRef.value?.toggleOptionalComponentStatus(currentComponentName)
    validationStore.removeOptionalValidation(index)
    store.finalizationComponent.splice(index,1)
   }
 }
 onMounted(() => {
  optionalStatusValue.forEach((item) => {
    if(store.finalizationComponent.find((el) => el.componentName === item)){
      additionalSectionRef.value?.toggleOptionalComponentStatus(item)
      validationStore.addOptionalValidation(item)
    }
  })
 })
</script>

<template>
  <section class="finalization-container p-1 w-full flex flex-col gap-2 relative">
     <AccordionList 
     :items="store.finalizationComponent" 
      title-key="key"
      @delete="deleteAdditionalComponent">
      <template #default="{item}">
        <Suspense>
         <template #default>
           <component 
           :is="components[item.componentName].component"
            v-bind="components[item.componentName].props"
            @add="components[item.componentName].add"
            @delete="components[item.componentName].delete"></component>
         </template>
         <template #fallback>
           <SkeletonLoading></SkeletonLoading>
         </template>
       </Suspense>
      </template>
    </AccordionList>
    <div class="footer">
      <AdditionalSection ref="additionalSectionRef" @add="addOptionalComponent"></AdditionalSection>
    </div>
  </section>
</template>