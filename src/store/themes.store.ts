import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { themesStyleConfig } from "../utils/themesStyleConfig";
import { dataThemes } from "../utils/themes";
import type { themesData } from "../utils/component.interface";
import type { themesConfig } from "../utils/component.interface";
export const useThemesStore = defineStore('themes',() => {
  const themes = ref<themesData>(dataThemes[0])
  const themesConfig = ref<themesConfig>({
    primaryFontFamily:'Open-Sans',
    secondaryFontFamily:'Roboto',
    fontSize:0,
    lineHeight:1,
  })
  const fontSizeValue = ['text-xs','text-base','text-lg']
  const lineHeightValue = ['leading-[1.3]','leading-[1.5]','leading-[1.7]','leading-[1.9]']
  const selectedThemes = computed(() => {
   const index = themesStyleConfig.findIndex(item => item.themesName === themes.value?.name)
   return themesStyleConfig[index] || themesStyleConfig[0]
 })
  const selectedFontsSize = computed(() => {
   return fontSizeValue[themesConfig.value.fontSize] ?? fontSizeValue[1]
  })
  const selectedLineHeight = computed(() => {
   return lineHeightValue[themesConfig.value.lineHeight] ?? lineHeightValue[1]
 })
 const selectedPrimaryFontFamily = computed(() => {
   switch(themesConfig.value.primaryFontFamily){
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
 const selectedSecondaryFontFamily = computed(() => {
   switch(themesConfig.value.secondaryFontFamily){
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
  return { 
    themesConfig,
    themes,
    selectedThemes,
    selectedFontsSize,
    selectedLineHeight,
    selectedPrimaryFontFamily,
    selectedSecondaryFontFamily
  }
})