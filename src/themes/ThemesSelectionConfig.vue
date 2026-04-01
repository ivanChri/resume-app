<script setup lang="ts">
  import { dataThemes } from '../utils/themesConfig/themes';
  import type { themesData } from '../utils/types/themes.interface';
  import { useThemesStore } from '../store/themes.store';
  const themesStore = useThemesStore()
  function addSeletectedThemes(themes:themesData):void{
    themesStore.themes = themes
  }
</script>

<template>
  <div class="themes-selection-container flex flex-wrap gap-3 align-center">
    <div v-for="(item,index) in dataThemes"
    class="p-1 border-2 rounded-md cursor-pointer text-center p-2 bg-gray-200"
    :class="{ 'border-blue-600' : item.name === themesStore.themes?.name }"
    @click="addSeletectedThemes(item)"
    :key="index">
      <img :src="item.themesImgUrl" class="w-60 h-60 rounded-md" :alt="item.name"/>
      <span class="text-bold">{{ item.name }}</span>
    </div>
  </div>
</template>