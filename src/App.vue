<script setup lang="ts">
 import FormController from './form/FormController.vue';
<<<<<<< HEAD
 import ThemesPreview from './themes/ThemesPreview.vue';
 import ThemesCustomize from './themes/ThemesCustomize.vue';
 import { print } from './utils/utility';
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <div class="flex flex-1 overflow-hidden">
      <div class="w-full lg:w-1/2 overflow-y-auto p-2 md:p-4 border-r border-gray-400 relative">
        <div class="mobile-top-bar lg:hidden fixed w-full border-b border-blue-500 rounded-br-lg rounded-bl-lg bg-gray-200 p-1 z-30 top-0 left-0 right-0">
           <ThemesCustomize device-type="mobile"></ThemesCustomize>
        </div>
        <div class="mt-20 lg:mt-0">
          <FormController @print-pdf="print"></FormController>
        </div>
      </div>
      <div class="hidden lg:block lg:w-1/2 overflow-y-auto bg-gray-100 p-4 lg:p-10">
        <div class="top-bar p-1 mb-1 flex flex-wrap gap-4 items-center">
          <ThemesCustomize device-type="desktop"></ThemesCustomize>
        </div>
        <ThemesPreview></ThemesPreview>
      </div>

=======
 import themesController from './themes/themesController.vue';
</script>

<template>
  <div class="@container p-1 grid grid-cols-2 gap-1 w-ful">
    <FormController></FormController>
    <div class="p-2 border-2">
      <themesController></themesController>
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
    </div>
  </div>
</template>
