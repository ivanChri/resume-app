<script setup lang="ts">
 import { computed,defineAsyncComponent } from 'vue';
 import SkeletonLoading from '../component/SkeletonLoading.vue';
 import type { themesProps } from '../utils/component.interface';
 import { useUserStore } from '../store/user.store';
 import { useThemesStore } from '../store/themes.store';
 const asyncTest = defineAsyncComponent(() => import('./test.vue'))
 const userStore = useUserStore()
 const themesStore = useThemesStore()
 const computedThemesConfig = computed(() => {
   return {
    primaryFonts:themesStore.selectedPrimaryFontFamily,
    fontsSize:themesStore.selectedFontsSize,
    lineHeight:themesStore.selectedLineHeight,
    supportedIcons:themesStore.themes.supportedIcon,
    iconColorAccents:themesStore.themes.iconColorAccents
   }
 })
 const computedHeader = computed(() => {
   return {
    firstName:userStore.biodata.firstName,
    lastName:userStore.biodata.lastName,
    jobTitle:userStore.biodata.jobTitle,
    photoPreview:userStore.biodata.photoPreview,
    email:userStore.biodata.email,
    phone:userStore.biodata.phone
   }
 })
 const computedAddtionalDetails = computed(() => {
   return [
    {id:'1a',name:'address',value:userStore.biodata.address},
    {id:'2b',name:'city',value:userStore.biodata.city},
    {id:'3c',name:'date of birth',value:userStore.biodata.dateOfBirth},
    {id:'4d',name:'place of birth',value:userStore.biodata.placeOfBirth},
    {id:'5e',name:'postalCode',value:userStore.biodata.postalCode},
    {id:'6f',name:'drivingLicense',value:userStore.biodata.drivingLicense},
    {id:'7g',name:'nationality',value:userStore.biodata.nationality},
    {id:'8h',name:'country',value:userStore.biodata.country}
   ].filter((item) => item.value)
 })
 const data = computed<themesProps>(() => {
  return {
   header:computedHeader.value,
   addtionalDetails:computedAddtionalDetails.value,
   summary:userStore.summary,
   experience:userStore.experience.filter((item) => item.jobTitle),
   education:userStore.education.filter((item) => item.schoolName || item.degree),
   socialMedia:userStore.socialMedia.filter((item) => item.label),
   skills:userStore.skills.filter((item) => item.name),
   portofolio:userStore.portofolio.filter((item) => item.projectName),
   course:userStore.courses.filter((item) => item.courseName),
   volunteering:userStore.volunteering.filter((item) => item.role),
   language:userStore.language.filter((item) => item.languageName),
   addtionalInformation:userStore.additionalInformation
  }
 })
</script>

<template>
  <div class="@container preview-container w-full">
  <div class="bg-gray-300 rounded-md min-h-full p-4 lg:p-8 flex justify-center overflow-y-auto">
    <div class="resume-container w-full md:w-[1000px] min-h-[800px] bg-white shadow-lg p-5">
     <suspense>
       <template #default>
        <asyncTest
         :data="data"
         :themes-data="computedThemesConfig"
         :style="themesStore.selectedThemes">
        </asyncTest>
       </template>
       <template #fallback>
         <skeleton-loading :rows="20" min-height="400px"></skeleton-loading>
       </template>
     </suspense>
    </div>
  </div>
  </div>
</template>