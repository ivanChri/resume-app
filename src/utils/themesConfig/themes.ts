import type { themesData } from "../types/themes.interface"
export const dataThemes:themesData[] = [
  {
    name:"professional-minimalist",
    supportedUserPhoto:false,
    themesImgUrl:"https://i.ibb.co.com/B2HvzPSZ/professional-minimalist.png",
    supportedIcon:false,
    iconColorAccents:""
  },
  {
    name:"twoColumn-professional",
    supportedUserPhoto:true,
    themesImgUrl:"https://i.ibb.co.com/x8SrXyRn/twocolumn-professional.png",
    supportedIcon:true,
    iconColorAccents:"fill-blue-600"
  },
  {
   name:"creative",
   supportedUserPhoto:true,
   themesImgUrl:"https://i.ibb.co.com/TDTr6BbN/creative.png",
   supportedIcon:true,
   iconColorAccents:"fill-orange-600"
  }
] as const