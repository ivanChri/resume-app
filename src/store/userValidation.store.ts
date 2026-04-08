import { defineStore } from "pinia";
import { reactive,computed } from "vue";
import { useUserStore } from "./user.store";
import { validateStringTypeData,validateArrayTypeData } from "../utils/utility/genericComputedValidation";
import type { biodata } from "../utils/types/form.interface";
export const useUserValidationStore = defineStore(('userValidation'), () => {
const userStore = useUserStore()
const biodataValidation = computed(() => {
  const keys = ['jobTitle','firstName','lastName','email','phone'] as const satisfies readonly (keyof biodata)[]
  return keys.every((value) => !!userStore.biodata[value])
})
const validation = reactive([ 
  biodataValidation,
  validateStringTypeData(() => userStore.summary),
  validateArrayTypeData(() => userStore.education),
  validateArrayTypeData(() => userStore.experience),
  validateArrayTypeData(() => userStore.socialMedia),
  validateArrayTypeData(() => userStore.skills),
])
 function addOptionalValidation(key:string):void{
  const userStoreKey = key as keyof typeof userStore
  if(Array.isArray(userStore[userStoreKey])){
    validation.push(validateArrayTypeData(() => userStore[userStoreKey] as object[]))
    return
  }
  validation.push(validateStringTypeData(() => userStore[userStoreKey] as string))
 }
 function removeOptionalValidation(index:number):void{
   validation.splice(index,1)
 }
 function validateAllData():boolean {
  return validation.every((el) => el.value)
  }
 return { 
   validateAllData,
   addOptionalValidation,
   removeOptionalValidation
  }
})