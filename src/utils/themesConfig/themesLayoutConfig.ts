import type { themesLayoutStyle } from "../types/themes.interface"
export const themesLayoutStyleConfig:Record<string,themesLayoutStyle> = {
  "professional-minimalist":{
    base:'w-65 rounded-md border-1 p-2 text-center border-box',
    header:'flex flex-row justify-between',
    main:'flex flex-col gap-1'
  },
  "twoColumn-professional":{
   base:'w-80 rounded-md border-1 p-2 text-center border-box flex flex-row justify-between',
   header:'flex flex-col gap-1',
   main:'flex flex-col gap-1 w-[47%]'
  },
  "creative":{
    base:'w-65 rounded-md border-1 p-2 text-center border-box',
    header:'flex flex-col gap-1',
    main:'flex flex-col gap-1'
  }
} as const

export const layoutOrderData:{name:string,data:string[]}[] = [
 {
  name:'Default',
  data:[
   'education',
   'experience',
   'skills',
   'portfolio',
   'course',
   'organization',
   'volunteering',
   'language'
  ]
 },
 {
  name:'Experienced',
  data: [
    'experience',
    'skills',
    'portfolio',
    'education',
    'course',
    'organization',
    'volunteering',
    'language'
  ]
 },
 {
  name:'Fresh Graduate',
  data:[
   'education',
   'experience',
   'portfolio',
   'skills',
   'organization',
   'volunteering',
   'course',
   'language'
  ]
 }
]