import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { themesStyleConfig } from "../utils/themesConfig/themesStyleConfig";
import { fontSizeValue,lineHeightValue,fontsFamilyValue } from "../utils/config/fieldConfig";
import type { themesData } from "../utils/types/themes.interface";
import type { themesConfig } from "../utils/types/themes.interface";
export const useThemesStore = defineStore('themes',() => {
  const themes = ref<themesData | null>(null)
  const themesConfig = ref<themesConfig>({
    primaryFontFamily:'Open-Sans',
    secondaryFontFamily:'Roboto',
    fontSize:0,
    lineHeight:1,
  })
  const selectedThemes = computed(() => {
   return themesStyleConfig[themes.value?.name!] ?? themesStyleConfig['professional-corporate-minimalist']
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
    themesConfig,
    themes,
    selectedThemes,
    selectedFontsSize,
    selectedLineHeight,
    selectedPrimaryFontFamily,
    selectedSecondaryFontFamily
  }
},{
 persist:{
  key:'themes-store',
  pick:['themes','themesConfig']
 },
})