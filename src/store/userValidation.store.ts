import { defineStore } from "pinia";
import { computed,type ComputedRef } from "vue";
import { useUserStore } from "./user.store";
import type { biodata } from "../utils/form.interface";
export const useUserValidationStore = defineStore(('userValidation'), () => {
 const regex = /<br\s*\/?>/i
 const userStore = useUserStore()
 function validateStringTypeData<T extends string>(getter : () => T):ComputedRef<boolean>{
   return computed(() => { 
    const data = getter().trim()
    return data.length > 0 && !regex.test(data)
   })
 }
 function validateArrayTypeData<T extends object>(getter : () => T[]):ComputedRef<boolean>{
   return computed(() => {
    try{
    const data = getter()
    if(!Array.isArray(data) || !data.length) return false
    return data.every((el) => {
     const val = Object.values(el)
     return val.every((value) => value !== '' && !regex.test(String(value)))
    })
    }catch{
      return false
    }
   })
 }
 const validation:{[key:string]:ComputedRef<boolean>} = {
  biodata:computed(() => {
   const keys = ['jobTitle','firstName','lastName','email','phone'] as const satisfies readonly (keyof biodata)[]
   return keys.every((value) => !!userStore.biodata[value])
 }),
  summary:validateStringTypeData(() => userStore.summary),
  education:validateArrayTypeData(() => userStore.education),
  experience:validateArrayTypeData(() => userStore.experience),
  socialMedia:validateArrayTypeData(() => userStore.socialMedia),
  skills:validateArrayTypeData(() => userStore.skills),
  portofolio:validateArrayTypeData(() => userStore.portofolio),
  language:validateArrayTypeData(() => userStore.language),
  volunteering:validateArrayTypeData(() => userStore.volunteering),
  course:validateArrayTypeData(() => userStore.courses),
  additionalInformation:validateStringTypeData(() => userStore.additionalInformation)
 }
 const validateAllData = computed<boolean>(() => {
   const data = Object.values(validation)
   return data.every((el) => el.value)
 })
 return { validateAllData }
})