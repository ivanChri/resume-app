<script setup lang="ts">
 import { ref,defineAsyncComponent,onMounted,onUnmounted } from 'vue';
 import FormController from './form/FormController.vue';
 import ThemesCustomize from './themes/ThemesCustomize.vue';
 import SkeletonLoading from './component/SkeletonLoading.vue';
 import LoadingSpinnerOverlay from './component/LoadingSpinnerOverlay.vue';
 import { exportPdf } from './utils/utility';
 const asyncThemesPreview = defineAsyncComponent(() => import('./themes/ThemesPreview.vue'))
 const isLoading = ref<boolean>(false)
 const isMobileDevice = ref<boolean>(false)
 const mediaQuery = window.matchMedia('(max-width: 1023px)')
 function updateLayout(e: MediaQueryListEvent | MediaQueryList) {
  isMobileDevice.value = e.matches
 }
 async function downloadPdf():Promise<void>{
  isLoading.value = true
  try {
    if(!isMobileDevice.value){
      await exportPdf()
      return
    }
    isMobileDevice.value = false
    await new Promise<void>((resolve) => setTimeout(resolve,2000))
    const element = document.getElementById('main-themes')
    if (element) await exportPdf()
  }catch (error){
    console.log(error)
  }finally{
    isLoading.value = false
  }
 }
 onMounted(() => {
   updateLayout(mediaQuery)
   mediaQuery.addEventListener('change',updateLayout)
 })
 onUnmounted(() => {
  mediaQuery.removeEventListener('change',updateLayout)
})
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <LoadingSpinnerOverlay :loading="isLoading"></LoadingSpinnerOverlay>
    <div class="flex flex-1 overflow-hidden">
      <div class="w-full lg:w-1/2 overflow-y-auto p-2 md:p-4 border-r border-gray-400 relative">
        <div class="mobile-top-bar lg:hidden fixed w-full border-b border-blue-500 rounded-br-lg rounded-bl-lg bg-gray-200 p-1 z-30 top-0 left-0 right-0">
           <ThemesCustomize device-type="mobile"></ThemesCustomize>
        </div>
        <div class="mt-20 lg:mt-0">
          <FormController @print-pdf="downloadPdf"></FormController>
        </div>
      </div>
      <div v-if="!isMobileDevice" class="hidden lg:block lg:w-1/2 overflow-y-auto bg-gray-100 p-4 lg:p-10">
        <div class="top-bar p-1 mb-1 flex flex-wrap gap-4 items-center">
          <ThemesCustomize device-type="desktop"></ThemesCustomize>
        </div>
        <Suspense>
          <template #default>
            <asyncThemesPreview></asyncThemesPreview>
          </template>
          <template #fallback>
            <SkeletonLoading :rows="30" min-height="700px"></SkeletonLoading>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>
