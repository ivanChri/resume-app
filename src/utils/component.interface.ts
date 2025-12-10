export type ParentType = 'experience' | 'education' | 'portofolio' | 'course' | 'awards' | 'volunteering'

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
  course:boolean,
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
}

export interface genericData<T> {
  parent:ParentType,
  data:T[],
  initialData:T,
  keys:genericDataKeys,
  infoText:string
}