<script setup lang="ts">
  import { dataThemes } from '../utils/themes';
  import type { themesData } from '../utils/component.interface';
  import { useThemesStore } from '../store/themes.store';
  const themesStore = useThemesStore()
  function addSeletectedThemes(themes:themesData):void{
    themesStore.themes = themes
  }
</script>

<template>
  <div class="themes-selection-container flex flex-wrap gap-2">
    <div v-for="(item,index) in dataThemes"
    class="p-1 border border-1 rounded-md cursor-pointer"
    :class="{ 'border-blue-600' : item.name === themesStore.themes?.name }"
    @click="addSeletectedThemes(item)"
    :key="index">
       {{ item.name }}
    </div>
  </div>
</template>