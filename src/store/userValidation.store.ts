import { defineStore } from "pinia";
import { computed,type ComputedRef } from "vue";
import { useUserStore } from "./user.store";
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
   const key = ['jobTitle','firstName','lastName','email','phone']
   return key.every((value) => !!userStore.biodata[value])
 }),
  summary:validateStringTypeData(() => userStore.summary),
  education:validateArrayTypeData(() => userStore.education)
 }
 const validateAllData = computed<boolean>(() => {
   const data = Object.values(validation)
   return data.every((el) => el.value)
 })
 return { validation,validateAllData }
})