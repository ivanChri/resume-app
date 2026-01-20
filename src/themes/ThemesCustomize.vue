<script setup lang="ts">
 import { ref,useTemplateRef,defineAsyncComponent } from 'vue';
 const componentIndex = ref(0)
 const asyncModal = defineAsyncComponent(() => import('../component/Modal.vue'))
 const asyncThemesSelectionConfig = defineAsyncComponent(() => import('../themes/ThemesSelectionConfig.vue'))
 const asyncThemesTextConfig = defineAsyncComponent(() => import('../themes/ThemesTextConfig.vue'))
 const components = [asyncThemesSelectionConfig,asyncThemesTextConfig]
 const modalRef = useTemplateRef('modalRef')
</script>

<template>
  <button @click="modalRef?.open()">open Modal</button>
  <asyncModal ref="modalRef">
     <template #header>
       <button class="p-1 border border-1 rounded-md" @click="componentIndex = 0">Themes & Colors</button>
       <button class="p-1 border border-1 rounded-md" @click="componentIndex = 1">Text</button>
     </template>
    <template #default>
       <div class="themes-config-container p-1">
          <component :is="components[componentIndex]"></component>
       </div>
    </template>
  </asyncModal>
</template>