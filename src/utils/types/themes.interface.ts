import type { 
  workExperice,
  education,
  skills,
  socialMedia,
  portfolio,
  course,
  volunteering,
  language,
  organization
} from "./form.interface";
import type { genericDataKeys } from "./component.interface";

export interface themesHeaderProps {
  header:{
    firstName:string,
    lastName:string,
    jobTitle:string,
    photoPreview:string,
  },
  addtionalDetails:{name:string,value:string}[],
  summaryContent:{name:string,value:string}[],
  contact:{name:string,value:string}[],
  socialMedia:socialMedia[],
  style:{
   base:string,
   header: string,
   infoHeader: string,
   name: string,
   jobTitle: string,
   sectionTitle: string,
   contact: string,
   additionalInfo: string,
   main: string,
   summary: string,
   summaryContent: string
  },
  themesData:themesConfigProps
}

export interface themesSectionProps<T> {
  name:string,
  data:T[],
  keys:genericDataKeys,
}

export type config = {
  experience: workExperice,
  education: education,
  portfolio: portfolio,
  volunteering: volunteering,
  course: course,
  skills:skills,
  language:language,
  organization:organization
}

type configToArray<T> = {
  [K in keyof T]: themesSectionProps<T[K]>
}[keyof T][]

export type sectionArray = configToArray<config>

export interface computedSection<T> extends themesSectionProps<T> {
  style: {
    sectionItem: string,
    sectionTitle: string,
    sectionHeader: string,
    sectionHeaderTitle: string,
    sectionHeaderInfo: string,
    sectionDesc: string,
    additionalSectionItem:string,
    additionalSectionHeader: string,
    additionalSectionInfo: string,
  }
}

export interface themesConfigProps {
  primaryFontsFamily:string,
  secondaryFontsFamily:string
  fontsSize:string,
  lineHeight:string,
  supportedIcons:boolean,
  iconColorAccents:string,
  supportedPhotos:boolean
}

export interface themesConfig {
  primaryFontFamily:string,
  secondaryFontFamily:string,
  fontSize:number,
  lineHeight:number
}

export interface themesData {
  name:string,
  supportedUserPhoto:boolean,
  themesImgUrl:string,
  supportedIcon:boolean,
  iconColorAccents:string
}

export interface resumeThemeStyle {
  base: string;
  header: string;
  infoHeader: string;
  name: string;
  jobTitle: string;
  sectionTitle: string;
  contact: string;
  additionalInfo: string;
  main: string;
  sectionItem: string;
  sectionHeader: string;
  sectionHeaderTitle: string;
  sectionHeaderInfo: string;
  summary: string;
  summaryContent: string;
  sectionDesc: string;
  additionalSectionItem:string;
  additionalSectionHeader: string;
  additionalSectionInfo: string;
}

export interface themesLayoutStyle {
  base:string,
  header:string,
  main:string
}