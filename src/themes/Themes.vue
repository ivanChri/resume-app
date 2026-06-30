<script setup lang="ts">
 import type { themesHeaderProps } from '../utils/types/themes.interface';
 import IconRendered from '../component/IconRendered.vue';
 defineProps<{
   data:themesHeaderProps,
  }>()
</script>

<template>
  <div 
   id="main-themes" 
   :class="[
     data.style.base,
     data.themesData.fontsSize,
     data.themesData.lineHeight,
    ]"
    :style="{ 
     '--font-primary': data.themesData.primaryFontsFamily, 
     '--font-secondary': data.themesData.secondaryFontsFamily 
    }">
    <header id="header" :class="data.style.header">
      <div v-if="data.themesData.supportedPhotos && data.header.photoPreview" class="img-container mb-3 p-1">
        <img :src="data.header.photoPreview" class="w-30 h-30 rounded-full border-1 border-orange-300"/>
      </div>
      <div :class="data.style.infoHeader">
        <div class="main-title">
          <h1 :class="data.style.jobTitle">{{ data.header.jobTitle }}</h1>
          <h2 :class="data.style.name">{{ data.header.firstName }} {{ data.header.lastName }}</h2>
        </div>
        <div id="contact" :class="data.style.contact">
          <div v-for="(item,index) in data.contact" :key="index" class="flex gap-2 flex-wrap">
            <IconRendered
             v-if="data.themesData.supportedIcons && item.value"
             :name="item.name"
             :icon-color-accents="data.themesData.iconColorAccents" 
             size="20">
            </IconRendered>
            <span>{{ item.value }}</span>
          </div>
          <div v-for="item in data.socialMedia" :key="item.id" class="flex gap-2">
            <IconRendered
             v-if="data.themesData.supportedIcons"
             :name="item.label.toLowerCase()"
             size="20"
             :icon-color-accents="data.themesData.iconColorAccents">
            </IconRendered>
            <a rel="noopener" target="_blank" :href="item.link" class="no-underline">
             <span>{{ item.label }}</span>
            </a>
          </div>  
        </div>
      </div>
      <div id="additionalInfo" :class="[data.style.additionalInfo]">
        <span v-for="(item,index) in data.addtionalDetails" :key="index">
          {{ item.name }} : {{ item.value }}
        </span>
      </div>
    </header>
    <main id="main" :class="data.style.main">
     <div class="profile">
      <div v-for="item in data.summaryContent">
       <div v-if="item.value" :class="[data.style.summary,data.style.summaryContent]">
        <h3 :class="data.style.sectionTitle">{{ item.name }}</h3>
        <p v-html="item.value"></p>
       </div>
      </div>
     </div>
     <slot name="main-content"></slot>
    </main>
  </div>
</template>

<style scoped>
#main-themes .sectionDesc ul {
  list-style-type: disc;
  margin-left: 1.25rem;
  margin-top: 0.5rem;
}

#main-themes :deep(.no-underline) {
  text-decoration: none;
  transition: color 0.2s;
}

#main-themes :deep(.no-underline:hover) {
  text-decoration: underline;
  text-decoration-color:gray;
}

#main-themes :deep(h3),
#header .main-title,
#main :deep(.section .section-title),
#main :deep(.section .section-header-title){ 
  font-family: var(--font-primary);
}

#contact,
#additionalInfo,
.profile p,
#main :deep(.section .section-header-info),
#main :deep(.section .additional-section-item),
#main :deep(.section .section-desc){
  font-family: var(--font-secondary);
}
</style>