<script setup lang="ts">
 import { computed } from 'vue';
 import { useThemesStore } from '../store/themes.store';
 import { layoutOrderData } from '../utils/themesConfig/themesLayoutConfig.ts';
 import ThemesLayoutCard from '../component/ThemesLayoutCard.vue';
 const themesStore = useThemesStore()
 const layoutStyle = computed(() => {
  return {
   base:themesStore.selectedThemesLayoutStyle.base,
   header:themesStore.selectedThemesLayoutStyle.header,
   main:themesStore.selectedThemesLayoutStyle.main
  }
 })
 const supportedPhoto = computed(() => themesStore.themes?.supportedUserPhoto)
 function setLayoutOrder(order:{name:string,data:string[]}):void{
   themesStore.themesSectionOrder = order
 }
</script>

<template>
  <div class="predefine-layout-container flex flex-wrap gap-3 justify-center md:justify-around">
    <div v-for="item in layoutOrderData"
     @click="setLayoutOrder(item)"
     class="card-container p-1 flex flex-col gap-2 rounded-md border-1 cursor-pointer border-grey-50 bg-gray-100"
     :class="{'border-blue-800 text-blue-800 bg-gray-200':item.name === themesStore.themesSectionOrder?.name }"
     :key="item.name">
      <ThemesLayoutCard 
      :data="item.data" 
      :layout="layoutStyle" 
      :supported-photos="supportedPhoto ?? false"/>
      <span class="font-bold text-center">{{ item.name }}</span>
    </div>
  </div>
</template>