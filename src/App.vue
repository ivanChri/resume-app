<script setup lang="ts">
 import FormController from './form/FormController.vue';
 import themesController from './themes/themesController.vue';
</script>

<template>
  <div class="@container p-1 grid grid-cols-2 gap-1 w-ful">
    <FormController></FormController>
    <div class="p-2 border-2">
      <themesController></themesController>
    </div>
  </div>
</template>
