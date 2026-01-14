<script setup lang="ts">
 import type { themesProps } from '../utils/component.interface';
 import { useUserStore } from '../store/user.store';
 import { computed } from 'vue';
 import { useThemesStore } from '../store/themes.store';
 import Slider from '../component/Slider.vue';
 import Dropdow from '../component/Dropdow.vue';
 import test from './test.vue';
 const userStore = useUserStore()
 const themesStore = useThemesStore()
 const fontSizeLabel = ['Small','Normal','Large']
 const primaryFontFamily = ['Sans','Mono']
 const lineHeightSteps = [
  { label: 'Compact', value: 1.3 },
  { label: 'Normal', value: 1.5 },
  { label: 'Relaxed', value: 1.7 },
  { label: 'Spacious', value: 1.9 },
]
 const selectedFontsSize = computed(() => {
  return themesStore.themesConfig.fontSize === 0 ? 'text-sm' : 
   themesStore.themesConfig.fontSize === 1 ? 'text-base' : 'text-lg'
 })
 const selectedFontFamily = computed(() => {
  return themesStore.themesConfig.fontFamily === 'Sans' ? 'var(--font-sans)' : 'var(--font-mono)'
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
 const config = computed<themesProps>(() => {
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
    <Slider v-model:selected-range-model="themesStore.themesConfig.fontSize" :labels="fontSizeLabel"></Slider>
    <div class="relative">
      <Dropdow v-model:selected-option="themesStore.themesConfig.fontFamily" :options="primaryFontFamily"></Dropdow>
    </div>
  </div>
  <test :props-config="config" :fonts="selectedFontFamily" :fonts-size="selectedFontsSize"></test>
</template>