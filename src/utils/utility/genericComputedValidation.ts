import { computed,type ComputedRef } from "vue";
const regex = /<br\s*\/?>/i
export function validateStringTypeData<T extends string>(getter : () => T):ComputedRef<boolean>{
   return computed(() => { 
    const data = getter().trim()
    return data.length > 0 && !regex.test(data)
   })
 }
export function validateArrayTypeData<T extends object>(getter : () => T[]):ComputedRef<boolean>{
   return computed(() => {
    try{
    const data = getter()
    if(!Array.isArray(data) || !data.length) return false
    return data.every((el) => {
     const val = Object.values(el)
     return val.every((value) => value && !regex.test(String(value)))
    })
    }catch{
      return false
    }
   })
} 