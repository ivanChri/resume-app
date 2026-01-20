import { defineStore } from "pinia";
import { ref } from "vue";
import type { themesData } from "../utils/component.interface";
import type { themesConfig } from "../utils/component.interface";
export const useThemesStore = defineStore('themes',() => {
  const selectedThemes = ref<themesData | null>(null)
  const themesConfig = ref<themesConfig>({
    primaryFontFamily:'',
    secondaryFontFamily:'',
    fontSize:1,
    lineHeight:1
  })
  return { themesConfig,selectedThemes }
})