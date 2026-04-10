import type { Component,ComputedRef } from "vue";
export type ParentType = 'experience' | 'education' | 'portofolio' | 'course' | 'volunteering'

interface formComponent {
  component:Component,
  props:Record<string,any>,
  add(data:any): void,
  delete(index:number): void
}

export type componentRegisrty = Record<string,formComponent>

export interface formControllerComponent extends formComponent {
  name:string,
  buttonName:string
}

export interface componentDataValidation {
  name:string,
  data:ComputedRef<boolean>
}  

export interface finalizationComponentData {
  id:string,
  key:string,
  componentName:string,
  isRequired:boolean,
  order:number
}

export interface optionalFinalizationComponentStatus {
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