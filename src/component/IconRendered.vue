<script setup lang="ts">
 import { computed } from 'vue';
 import { iconData } from '../utils/iconData';
 const props = defineProps<{
   name:string,
   size:string,
   iconColorAccents:string
 }>()
 const selectedIcons = computed(() => {
  return iconData[props.name] || iconData['defaultIcons']
 })
</script>

<template>
 <svg xmlns="http://www.w3.org/2000/svg" 
   :width="size" 
   :height="size" 
   viewBox="0 0 24 24"
   :class="iconColorAccents"
   v-html="selectedIcons">
 </svg>
</template>