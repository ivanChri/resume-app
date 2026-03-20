<script setup lang="ts">
<<<<<<< HEAD
  import { dataThemes } from '../utils/themes';
  import type { themesData } from '../utils/component.interface';
  import { useThemesStore } from '../store/themes.store';
  const themesStore = useThemesStore()
  function addSeletectedThemes(themes:themesData):void{
    themesStore.themes = themes
  }
=======
  const data = ['themes-1','themes-2','themes-3','themes-4']
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
</script>

<template>
  <div class="themes-selection-container flex flex-wrap gap-2">
<<<<<<< HEAD
    <div v-for="(item,index) in dataThemes"
    class="p-1 border border-1 rounded-md cursor-pointer"
    :class="{ 'border-blue-600' : item.name === themesStore.themes?.name }"
    @click="addSeletectedThemes(item)"
    :key="index">
       {{ item.name }}
=======
    <div v-for="(item,index) in data" class="p-1 border border-1 rounded-md" :key="index">
       {{ item }}
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
    </div>
  </div>
</template>