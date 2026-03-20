import type { 
  workExperice,
  education,
  skills,
  socialMedia,
  portofolio,
  course,
  volunteering,
  language } from "./form.interface";
export type ParentType = 'experience' | 'education' | 'portofolio' | 'course' | 'volunteering'

export interface finalizationComponentData {
  id:string,
  key:string,
  componentName:string,
  isRequired:boolean,
  order:number
}

export interface optionalFinalizationComponentStatus {
  awards:boolean,
  portofolio:boolean,
  courses:boolean,
  language:boolean,
  volunteering:boolean,
  additionalInformation:boolean
}

export interface genericDataKeys {
  id: string,
  title: string,
  sub: string,
  startDate?: string,
  endDate?: string,
  city?: string,
  description: string,
  link?:string,
  year?:string,
  employmentTypes?:string
}

export interface genericProps<T> {
  parent:ParentType,
  data:T[],
  initialData:T,
  keys:genericDataKeys,
  infoText:string | null,
}

interface genericEmitter<T>{
  addData:(data:T) => void,
  deleteData:(index:number) => void
}

export interface genericData<T> {
  props:genericProps<T>
  emit:genericEmitter<T>
}

export interface themesProps {
  header:{
    firstName:string,
    lastName:string,
    jobTitle:string,
    photoPreview:string,
    email:string,
    phone:string
  },
  addtionalDetails:{
    id:string,
    name:string,
    value:string}[],
  summary:string,
  experience:workExperice[],
  education:education[],
  skills:skills[],
  socialMedia:socialMedia[],
  portofolio:portofolio[],
  course:course[],
  volunteering:volunteering[],
  language:language[],
  addtionalInformation:string
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