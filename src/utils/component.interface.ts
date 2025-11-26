export type ParentType = 'experience' | 'education' | 'portofolio' | 'course' | 'awards' | 'volunteering'

export interface finalizationComponentData {
  id:string
  key:string
  componentName:string
  isRequired:boolean
  order:number
}

export interface optionalFinalizationComponentStatus {
  awards:boolean,
  portofolio:boolean,
  course:boolean,
  language:boolean,
  volunteering:boolean,
  additionalInformation:boolean
}