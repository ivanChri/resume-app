import { defineAsyncComponent } from 'vue';
import { genericConfigGenerator } from './genericConfig.ts';
import type { formControllerComponent } from '../types/component.interface.ts';
const asyncGenericComponent = defineAsyncComponent(() => import('../../form/GenericList.vue'))
export function getFormComponents():formControllerComponent[]{
   const genericConfig = genericConfigGenerator() 
   return [
   {
    name:'Biodata',
    buttonName:'Personal Info',
    component:defineAsyncComponent(() => import('../../form/BiodataForm.vue')),
    props:{},
    add:() => {},
    delete:() => {}
   },
   {
    name:'experience',
    buttonName:'Work Experience',
    component:asyncGenericComponent,
    props:genericConfig['experience'].props,
    add:genericConfig['experience'].emit.addData,
    delete:genericConfig['experience'].emit.deleteData
   },
   {
    name:'education',
    buttonName:'Education',
    component:asyncGenericComponent,
    props:genericConfig['education'].props,
    add:genericConfig['education'].emit.addData,
    delete:genericConfig['education'].emit.deleteData
   },
   {
    name:'socialMedia',
    buttonName:'Social Media',
    component:defineAsyncComponent(() => import('../../form/SocialMediaForm.vue')),
    props:{},
    add:() => {},
    delete:() => {}
   },
   {
    name:'skills',
    buttonName:'Skills',
    component:defineAsyncComponent(() => import('../../form/SkillsForm.vue')),
    props:{},
    add:() => {},
    delete:() => {}
   },
   {
    name:'summary',
    buttonName:'Profesional Summary',
    component:defineAsyncComponent(() => import('../../form/SummaryForm.vue')),
    props:{},
    add:() => {},
    delete:() => {}
   },
   {
    name:'finalization',
    buttonName:'finish',
    component:defineAsyncComponent(() => import('../../form/FinalizationForm.vue')),
    props:{},
    add:() => {},
    delete:() => {}
   }
 ] as const
}