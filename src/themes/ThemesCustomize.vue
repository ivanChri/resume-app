<script setup lang="ts">
 import { ref,computed,useTemplateRef,defineAsyncComponent } from 'vue';
 type device = 'mobile' | 'desktop'
 const props = defineProps<{
   deviceType:device
 }>()
 const componentIndex = ref(0)
 const asyncModal = defineAsyncComponent(() => import('../component/Modal.vue'))
 const asyncThemesSelectionConfig = defineAsyncComponent(() => import('../themes/ThemesSelectionConfig.vue'))
 const asyncThemesTextConfig = defineAsyncComponent(() => import('../themes/ThemesTextConfig.vue'))
 const asyncPreview = defineAsyncComponent(() => import('./ThemesPreview.vue'))
 const components = [asyncPreview,asyncThemesSelectionConfig,asyncThemesTextConfig]
 const modalRef = useTemplateRef('modalRef')
 const cumpotedDeviceType = computed(() => {
   return props.deviceType === 'mobile' ? '=' : 'Customize'
 })
</script>

<template>
  <div class="main-modal p-1">
  <button @click="modalRef?.open()" class="border-1 cursor-pointer rounded-full w-12 h-12 font-bold lg:rounded-md lg:w-25 lg:h-auto p-2 border-gray-400 bg-blue-600 text-white">
    {{ cumpotedDeviceType }}
  </button>
  <asyncModal ref="modalRef">
     <template #header>
        <button @click="componentIndex = 0" :class="[
          'px-4 py-2 text-sm font-medium transition-all duration-200 -mb-px',
          componentIndex === 0 
          ? 'text-blue-600 border-b-2 border-blue-600' 
          : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent']">Preview</button>
       <button @click="componentIndex = 1" :class="[
          'px-4 py-2 text-sm font-medium transition-all duration-200 -mb-px',
          componentIndex === 1
          ? 'text-blue-600 border-b-2 border-blue-600' 
          : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent']">Themes</button>
       <button  @click="componentIndex = 2" :class="[
          'px-4 py-2 text-sm font-medium transition-all duration-200 -mb-px',
          componentIndex === 2
          ? 'text-blue-600 border-b-2 border-blue-600' 
          : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent']">Text</button>
     </template>
    <template #default>
       <div class="themes-config-container p-1">
          <component :is="components[componentIndex]"></component>
       </div>
    </template>
  </asyncModal>
  </div>
</template>