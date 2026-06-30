import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { themesStyleConfig } from "../utils/themesConfig/themesStyleConfig";
import { themesLayoutStyleConfig } from "../utils/themesConfig/themesLayoutConfig";
import { fontSizeValue,lineHeightValue,fontsFamilyValue } from "../utils/config/fieldConfig";
import type { themesData } from "../utils/types/themes.interface";
import type { themesConfig } from "../utils/types/themes.interface";
export const useThemesStore = defineStore('themes',() => {
  const themes = ref<themesData | null>(null)
  const themesSectionOrder = ref<{name:string,data:string[]} | null>(null)
  const themesConfig = ref<themesConfig>({
    primaryFontFamily:'Open-Sans',
    secondaryFontFamily:'Roboto',
    fontSize:0,
    lineHeight:1,
  })
  const selectedThemesStyle = computed(() => {
   return themesStyleConfig[themes.value?.name || 'professional-minimalist']
  })
  const selectedThemesLayoutStyle = computed(() => {
   return themesLayoutStyleConfig[themes.value?.name || 'professional-minimalist']
  })
  const selectedFontsSize = computed(() => {
   return fontSizeValue[themesConfig.value.fontSize] ?? fontSizeValue[1]
  })
  const selectedLineHeight = computed(() => {
   return lineHeightValue[themesConfig.value.lineHeight] ?? lineHeightValue[1]
 })
 const selectedPrimaryFontFamily = computed(() => {
   return fontsFamilyValue[themesConfig.value.primaryFontFamily] ?? fontsFamilyValue['Open-sans']
 })
 const selectedSecondaryFontFamily = computed(() => {
   return fontsFamilyValue[themesConfig.value.secondaryFontFamily] ?? fontsFamilyValue['Open-sans']
 })
  return { 
    themes,
    themesSectionOrder,
    themesConfig,
    selectedThemesStyle,
    selectedThemesLayoutStyle,
    selectedFontsSize,
    selectedLineHeight,
    selectedPrimaryFontFamily,
    selectedSecondaryFontFamily
  }
},{
 persist:{
  key:'themes-store',
  pick:['themes','themesConfig','themesSectionOrder']
 },
})