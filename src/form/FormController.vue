<script setup lang="ts">
  import { ref,computed,defineAsyncComponent,useTemplateRef,shallowRef} from 'vue';
  import SkeletonLoading from '../component/SkeletonLoading.vue';
  import { useUserValidationStore } from '../store/userValidation.store';
  import { getFormComponent } from '../utils/utility/getFormComponent.ts';
  import type { formControllerComponent } from '../utils/types/component.interface.ts';
  const asyncAlert = defineAsyncComponent(() => import('../component/Alert.vue'))
  const components = shallowRef<formControllerComponent[]>(getFormComponent())
  const emit = defineEmits<{
    (e:'printPdf'):Promise<void>
  }>()
  const alertRef = useTemplateRef('alertRef')
  const componentIndex = ref<number>(0)
  const validation = useUserValidationStore()
  const nextButtonLabel = computed(() => {
   return components.value[componentIndex.value + 1]?.buttonName || 'Download'
  })
  function next():void{
    if(componentIndex.value < components.value.length - 1){
      componentIndex.value++
    }else{
      checkData()
    }
  }
  function back():void{
    if(componentIndex.value > 0){
      componentIndex.value--
    }
  }
  function checkData():void{
   if(!validation.validateAllData()){
    alertRef.value?.open()
   }else{
    printPdf()
   }
  }
  function printPdf():void{
    emit('printPdf')
  }
  function scrollToTop():void{
    if (window.scrollY > 0) {
     window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
</script>

<template>
   <div class="@container form-container flex flex-col gap-2 border-1 border-gray-400 rounded-md p-1">
     <asyncAlert ref="alertRef" :showConfirmButton="true" @confirm="printPdf">
       <template #header>Download Confirmation</template>
       <template #body>Some Data Is Incomplete Are You Sure To Download It?</template>
       <template #confirmButtonName>Download</template>
      </asyncAlert>
     <div class="component-container min-h-[300px] md:min-h-[400px] lg:min-h-[450px] rounded-md p-1">
      <KeepAlive>
      <Suspense :key="componentIndex" @resolve="scrollToTop">
        <template #default>
          <component
           :is="components[componentIndex].component"
           v-bind="components[componentIndex].props"
           @add="components[componentIndex].add"
           @delete="components[componentIndex].delete">
          </component>
       </template>
       <template #fallback>
         <SkeletonLoading :rows="15" minHeight="400px"></SkeletonLoading>   
       </template>
      </Suspense>
      </KeepAlive>
     </div>
     <div class="button-container bg-slate-700 rounded-md  p-2 flex items-center justify-between">
       <button v-if="componentIndex > 0" class="border-2 rounded-md p-1 cursor-pointer text-center text-white bg-blue-600" @click="back">
        Back
       </button>
       <div class="info-container p-1 hidden lg:block">
         <span v-for="(value,index) in components" :key="value.name" :class="{'border-blue-800 bg-blue-300':index == componentIndex}" class="border-1 text-white inline-block mx-1  p-2 rounded-full transition-all duration-200"></span>
       </div>
       <button class="border-2 rounded-md p-1 cursor-pointer text-center text-white bg-blue-600" @click="next">
        Next : {{ nextButtonLabel }}
      </button>
     </div>
   </div>
</template>