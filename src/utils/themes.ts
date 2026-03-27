import type { themesData } from "./component.interface";
export const dataThemes:themesData[] = [
  {
    name:"professional-corporate-minimalist",
    supportedUserPhoto:false,
    themesImgUrl:"",
    supportedIcon:false,
    iconColorAccents:""
  },
  {
    name:"twoColumn-professional",
    supportedUserPhoto:true,
    themesImgUrl:"",
    supportedIcon:true,
    iconColorAccents:"fill-blue-600"
  },
  {
   name:"creative",
   supportedUserPhoto:true,
   themesImgUrl:"",
   supportedIcon:true,
   iconColorAccents:"fill-orange-600"
  }
] as const