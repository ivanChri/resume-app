<script setup lang="ts">
 import type { themesProps } from '../utils/component.interface';
 import { useUserStore } from '../store/user.store';
 import { computed } from 'vue';
 import { useThemesStore } from '../store/themes.store';
 import test from './test.vue';
 import ThemesCustomize from './ThemesCustomize.vue';
 const userStore = useUserStore()
 const themesStore = useThemesStore()
 const selectedFontsSize = computed(() => {
  const fontSizeValue = ['text-sm','text-base','text-lg']
  return fontSizeValue[themesStore.themesConfig.fontSize] ?? fontSizeValue[1]
 })
 const selectedFontFamily = computed(() => {
   switch(themesStore.themesConfig.primaryFontFamily){
    case 'Monospace':
     return 'var(--font-mono)'
    case 'Roboto':
     return 'var(--font-roboto)'
    case 'Montserrat':
     return 'var(--font-montserrat)'
    default :
     return 'var(--font-opensans)'
   }
 })
 const selectedLineHeight = computed(() => {
   const lineHeightValue = ['leading-[1.3]','leading-[1.5]','leading-[1.7]','leading-[1.9]']
   return lineHeightValue[themesStore.themesConfig.lineHeight] ?? lineHeightValue[1]
 })
 const computedHeader = computed(() => {
   return {
    firstName:userStore.biodata.firstName,
    lastName:userStore.biodata.lastName,
    jobTitle:userStore.biodata.jobTitle,
    photoPreview:userStore.biodata.photoPreview
   }
 })
 const computedAddtionalDetails = computed(() => {
   return [
    {name:'email',value:userStore.biodata.email},
    {name:'phone',value:userStore.biodata.phone},
    {name:'address',value:userStore.biodata.address},
    {name:'city',value:userStore.biodata.city},
    {name:'dateOfBirth',value:userStore.biodata.dateOfBirth},
    {name:'placeOfBirth',value:userStore.biodata.placeOfBirth},
    {name:'postalCode',value:userStore.biodata.postalCode},
    {name:'drivingLicense',value:userStore.biodata.drivingLicense},
    {name:'nationality',value:userStore.biodata.nationality}
   ].filter((item) => item.value)
 })
 const data = computed<themesProps>(() => {
  return {
   header:computedHeader,
   addtionalDetails:computedAddtionalDetails,
   summary:userStore.summary,
   experience:userStore.experience,
   education:userStore.education,
   socialMedia:userStore.socialMedia,
   skills:userStore.skills,
   portofolio:userStore.portofolio,
   course:userStore.course,
   volunteering:userStore.volunteering,
   language:userStore.language,
   addtionalInformation:userStore.additionalInformation
  }
 })
</script>

<template>
  <div class="topbar p-1 boder-1 flex flex-col gap-2">
    <ThemesCustomize></ThemesCustomize>
  </div>
  <test :props-data="data" :fonts="selectedFontFamily" :fonts-size="selectedFontsSize" :line-height="selectedLineHeight"></test>
</template>