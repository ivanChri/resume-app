<script setup lang="ts">
 import { useThemesStore } from '../store/themes.store';
 import Slider from '../component/Slider.vue';
 import Dropdow from '../component/Dropdow.vue';
 const themesStore = useThemesStore()
 const fontSizeLabel = ['Small','Normal','Large']
 const lineHeightStepsLabel = ['Compact','Normal','Relaxed','Spacious']
 const primaryFontFamilyLabel = ['Open-Sans','Monospace','Roboto','Montserrat']
</script>

<template>
  <div class="text-config-container flex flex-col gap-2">
    <div class="dropdown-container flex flex-row gap-1">
      <div class="relative p-1 grow-1">
        <h3 class="mb-2">Primary Font</h3>
        <Dropdow v-model:selected-option="themesStore.themesConfig.primaryFontFamily" :options="primaryFontFamilyLabel"></Dropdow>
      </div>
      <div class="relative p-1 grow-1">
        <h3 class="mb-2">Secondary Font</h3>
        <Dropdow v-model:selected-option="themesStore.themesConfig.secondaryFontFamily" :options="primaryFontFamilyLabel"></Dropdow>
      </div>
    </div>
    <div class="slider-container flex flex-col gap-2">
      <div class="p-1 mb-2">
       <h3 class="mb-2">Font-Size</h3>
       <Slider v-model:selected-range-model="themesStore.themesConfig.fontSize" :labels="fontSizeLabel"></Slider>
      </div>
      <div class="p-1 mb-2">
        <h3 class="mb-2">Line-Height</h3>
        <Slider v-model:selected-range-model="themesStore.themesConfig.lineHeight" :labels="lineHeightStepsLabel"></Slider>
      </div>
    </div>
  </div>
</template>