<script setup lang="ts">
 import { useTemplateRef,onMounted } from 'vue';
 import { useComponentStore } from '../store/component.store';
 import { useUserValidationStore } from '../store/userValidation.store';
 import { getOptionalDataResetHandler } from '../utils/utility/utility';
 import { getFinalizationComponent } from '../utils/config/finalizationComponentsConfig.ts';
 import SkeletonLoading from '../component/SkeletonLoading.vue';
 import AccordionList from '../component/AccordionList.vue';
 import AdditionalSection from '../component/AdditionalSection.vue';
 import type { componentRegisrty } from '../utils/types/component.interface.ts';
 const components:componentRegisrty = getFinalizationComponent()
 const additionalSectionRef = useTemplateRef('additionalSectionRef')
 const componentStore = useComponentStore()
 const validationStore = useUserValidationStore()
 const optionalStatusValue = ['portofolio','courses','language','volunteering','additionalInformation']
 function addOptionalComponent(key:string,componentName:string):void{
   componentStore.addComponent(key,componentName)
   additionalSectionRef.value?.toggleOptionalComponentStatus(componentName)
   validationStore.addOptionalValidation(componentName)
 }
 function deleteAdditionalComponent(itemId:string):void{
   const index = componentStore.finalizationComponent.findIndex((item) => item.id == itemId)
   const currentComponentName = componentStore.finalizationComponent[index].componentName
   if(index !== -1){
    getOptionalDataResetHandler(currentComponentName)
    additionalSectionRef.value?.toggleOptionalComponentStatus(currentComponentName)
    validationStore.removeOptionalValidation(index)
    componentStore.deleteComponent(index)
   }
 }
 onMounted(() => {
  optionalStatusValue.forEach((item) => {
    if(componentStore.finalizationComponent.find((el) => el.componentName === item)){
      validationStore.addOptionalValidation(item)
      additionalSectionRef.value?.toggleOptionalComponentStatus(item)
    }
  })
 })
</script>

<template>
  <section class="finalization-container p-1 w-full flex flex-col gap-2 relative">
     <AccordionList 
     :items="componentStore.finalizationComponent"
      title-key="key"
      :computed-component-status="validationStore.statusMap"
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