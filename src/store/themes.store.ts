import { defineStore } from "pinia";
import { ref } from "vue";
import type { themesData } from "../utils/component.interface";
export const useThemesStore = defineStore('themes',() => {
  const selectedThemes = ref<themesData | null>(null)
  const themesConfig = ref<{fontFamily:string,fontSize:number,lineHeight:number}>({
    fontFamily:'',
    fontSize:1,
    lineHeight:1
  })
  return { themesConfig,selectedThemes }
})