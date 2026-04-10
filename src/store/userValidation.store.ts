import { defineStore } from "pinia";
import { ref,computed,type ComputedRef } from "vue";
import { useUserStore } from "./user.store";
import { validateStringTypeData,validateArrayTypeData } from "../utils/utility/genericComputedValidation";
import type { biodata } from "../utils/types/form.interface";
import type { componentDataValidation } from "../utils/types/component.interface";
export const useUserValidationStore = defineStore(('userValidation'), () => {
const userStore = useUserStore()
const validationKey = ref([
  'biodata',
  'summary',
  'education',
  'experience',
  'socialMedia',
  'skills'
 ])
const biodataValidation = computed(() => {
  const keys = ['jobTitle','firstName','lastName','email','phone'] as const satisfies readonly (keyof biodata)[]
  return keys.every((value) => !!userStore.biodata[value])
})
const computedProperty = computed<Record<string,ComputedRef<boolean>>>(() => {
 return { 
   biodata:biodataValidation,
   summary:validateStringTypeData(() => userStore.summary),
   education:validateArrayTypeData(() => userStore.education),
   experience:validateArrayTypeData(() => userStore.experience),
   socialMedia:validateArrayTypeData(() => userStore.socialMedia),
   skills:validateArrayTypeData(() => userStore.skills),
   portofolio:validateArrayTypeData(() => userStore.portofolio),
   courses:validateArrayTypeData(() => userStore.courses),
   language:validateArrayTypeData(() => userStore.language),
   volunteering:validateArrayTypeData(() => userStore.volunteering),
   additionalInformation:validateStringTypeData(() => userStore.additionalInformation)
  }
 })
 const currentValidationValue = computed<componentDataValidation[]>(() => {
   return validationKey.value.map((item:string) => {
    return {
      name:item,
      data:computedProperty.value[item]
    }
   })
 })
 const statusMap = computed<Record<string,componentDataValidation>>(() => {
  const map: Record<string,componentDataValidation> = {}
   currentValidationValue.value.forEach((status) => {
    map[status.name] = status
  })
  return map
})
 function addOptionalValidation(key:string):void{
  if(key) validationKey.value.push(key)
 }
 function removeOptionalValidation(index:number):void{
  if(index !== -1) validationKey.value.splice(index,1)
 }
 function validateAllData():boolean{
  return currentValidationValue.value.every((el) => el.data.value)
 }
 return {
   statusMap,
   validateAllData,
   addOptionalValidation,
   removeOptionalValidation
  }
})