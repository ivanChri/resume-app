<script setup lang="ts">
 import { ref,computed,defineAsyncComponent,onMounted,onUnmounted } from 'vue';
 import SkeletonLoading from '../component/SkeletonLoading.vue';
 import { dataThemes } from '../utils/themesConfig/themes';
 import { getSectionConfig } from '../utils/config/sectionComponentsConfig.ts';
 import { layoutOrderData } from '../utils/themesConfig/themesLayoutConfig.ts';
 import type { themesHeaderProps,computedSection,config } from '../utils/types/themes.interface';
 import { useUserStore } from '../store/user.store';
 import { useThemesStore } from '../store/themes.store';
 const asyncThemes = defineAsyncComponent(() => import('./Themes.vue'))
 const asyncThemesSection = defineAsyncComponent(() => import('../component/ThemesSection.vue'))
 const userStore = useUserStore()
 const themesStore = useThemesStore()
 const resumeRef = ref<HTMLDivElement | null>(null)
 const isMobile = ref<boolean>(false)
 const scaleRatio = ref(1)
 const targetWidth = 1000
 const mediaQuery = window.matchMedia(`(max-width: ${targetWidth}px)`)
 const computedThemesConfig = computed(() => {
   return {
    primaryFontsFamily:themesStore.selectedPrimaryFontFamily,
    secondaryFontsFamily:themesStore.selectedSecondaryFontFamily,
    fontsSize:themesStore.selectedFontsSize,
    lineHeight:themesStore.selectedLineHeight,
    supportedIcons:themesStore.themes?.supportedIcon ?? false,
    iconColorAccents:themesStore.themes?.iconColorAccents ?? '',
    supportedPhotos:themesStore.themes?.supportedUserPhoto ?? false
   }
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
    {name:'address',value:userStore.biodata.address},
    {name:'city',value:userStore.biodata.city},
    {name:'date of birth',value:userStore.biodata.dateOfBirth},
    {name:'place of birth',value:userStore.biodata.placeOfBirth},
    {name:'postalCode',value:userStore.biodata.postalCode},
    {name:'drivingLicense',value:userStore.biodata.drivingLicense},
    {name:'nationality',value:userStore.biodata.nationality},
    {name:'country',value:userStore.biodata.country}
   ].filter((item) => item.value)
 })
 const data = computed<themesHeaderProps>(() => {
  return {
   header:computedHeader.value,
   addtionalDetails:computedAddtionalDetails.value,
   summaryContent:[
    {name:'summary',value:userStore.summary},
    {name:'addtionalInformation',value:userStore.additionalInformation}
   ],
   contact:[
   {name:'phone',value:userStore.biodata.phone},
   {name:'email',value:userStore.biodata.email}
   ],
   socialMedia:userStore.socialMedia.filter((item) => item.label),
   style:{
    base: themesStore.selectedThemesStyle?.base ?? '',
    header: themesStore.selectedThemesStyle?.header ?? '',
    jobTitle: themesStore.selectedThemesStyle?.jobTitle ?? '',
    infoHeader: themesStore.selectedThemesStyle?.infoHeader ?? '',
    name: themesStore.selectedThemesStyle?.name ?? '',
    contact: themesStore.selectedThemesStyle?.contact ?? '',
    additionalInfo: themesStore.selectedThemesStyle?.additionalInfo ?? '',
    sectionTitle: themesStore.selectedThemesStyle?.sectionTitle ?? '',
    main: themesStore.selectedThemesStyle?.main ?? '',
    summary: themesStore.selectedThemesStyle?.summary ?? '',
    summaryContent: themesStore.selectedThemesStyle?.summaryContent ?? ''
   },
   themesData:computedThemesConfig.value
  }
 })
 const sectionsComputedData = computed<computedSection<config[keyof config]>[]>(() => {
  if(!themesStore.themesSectionOrder) return []
  const config = getSectionConfig()
  return themesStore.themesSectionOrder.data
   .filter((name) => config[name] && config[name].data !== undefined) 
   .map((name) => {
    return {
      ...config[name],
      style:{
       sectionItem:themesStore.selectedThemesStyle?.sectionItem ?? '',
       sectionTitle:themesStore.selectedThemesStyle?.sectionTitle ?? '',
       sectionHeader:themesStore.selectedThemesStyle?.sectionHeader ?? '',
       sectionHeaderTitle:themesStore.selectedThemesStyle?.sectionHeaderTitle ?? '',
       sectionHeaderInfo:themesStore.selectedThemesStyle?.sectionHeaderInfo ?? '',
       sectionDesc:themesStore.selectedThemesStyle?.sectionDesc ?? '',
       additionalSectionItem:themesStore.selectedThemesStyle?.additionalSectionItem ?? '',
       additionalSectionHeader:themesStore.selectedThemesStyle?.additionalSectionHeader ?? '',
       additionalSectionInfo:themesStore.selectedThemesStyle?.additionalSectionInfo ?? ''
      } 
    }
  })
 })
 function calculateScale():void{
   if(!resumeRef.value) return
   if(mediaQuery.matches){
    const containerWidth = window.innerWidth
    scaleRatio.value = containerWidth / targetWidth
   }else{
    scaleRatio.value = 1
   }
 }
 function handleMediaQueryChange(e: MediaQueryListEvent | MediaQueryList):void{
   isMobile.value = e.matches
   if(e.matches){
     calculateScale()
     window.addEventListener('resize',calculateScale)
   }else{
    scaleRatio.value = 1
    window.removeEventListener('resize', calculateScale)
   }
 }
 onMounted(() => {
   if(!themesStore.themes) themesStore.themes = dataThemes[0]
   if(!themesStore.themesSectionOrder) themesStore.themesSectionOrder = layoutOrderData[0]
   handleMediaQueryChange(mediaQuery)
   mediaQuery.addEventListener('change',handleMediaQueryChange)
 })
 onUnmounted(() => {
   mediaQuery.addEventListener('change',handleMediaQueryChange)
})
</script>

<template>
  <div v-if="sectionsComputedData.length" class="preview-container w-full">
    <div class="bg-none md:bg-gray-300 rounded-md h-dvh md:h-auto p-1 md:p-6 lg:p-8 flex justify-center md:overflow-y-auto md:overflow-x-hidden"> 
      <div class="w-full flex justify-center h-dvh md:h-auto">
        <div 
          ref="resumeRef"
          :class="[
            'resume-container border-1 rounded-md md:border-none bg-white shadow-lg p-4 md:p-5 origin-top',
            isMobile ? 'min-w-[850px] min-h-fit' : 'w-full max-w-[210mm]'
          ]"
          :style="{ transform: isMobile ? `scale(${scaleRatio})` : 'none' }">
          <suspense>
            <template #default>
              <asyncThemes :data="data">
                <template #main-content>
                  <asyncThemesSection 
                    v-for="item in sectionsComputedData"
                    :key="item.name"
                    v-bind="item"
                  />
                </template>
              </asyncThemes>
            </template>
            <template #fallback>
              <skeleton-loading :rows="isMobile ? 30 : 20" min-height="500px"></skeleton-loading>
            </template>
          </suspense>
        </div>
      </div>
    </div>
  </div>
</template>