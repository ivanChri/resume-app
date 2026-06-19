import { defineAsyncComponent } from 'vue';
import { genericConfigGenerator } from './genericConfig.ts';
import type { componentRegisrty } from '../types/component.interface.ts';
const asyncGenericComponent = defineAsyncComponent(() => import('../../form/GenericList.vue'))
export function getFinalizationComponent():componentRegisrty{
 const genericConfig = genericConfigGenerator()
  return {
    biodata:{
   component:defineAsyncComponent(() => import('../../form/BiodataForm.vue')),
   props:{},
   add:() => {},
   delete:() => {}
  },
  experience:{
   component:asyncGenericComponent,
   props:genericConfig['experience'].props,
   add:genericConfig['experience'].emit.addData,
   delete:genericConfig['experience'].emit.deleteData
  },
  education:{
   component:asyncGenericComponent,
   props:genericConfig['education'].props,
   add:genericConfig['education'].emit.addData,
   delete:genericConfig['education'].emit.deleteData
  },
  summary:{
   component:defineAsyncComponent(() => import('../../form/SummaryForm.vue')),
   props:{},
   add:() => {},
   delete:() => {}
  },
  socialMedia:{
   component:defineAsyncComponent(() => import('../../form/SocialMediaForm.vue')),
   props:{},
   add:() => {},
   delete:() => {}
  },
  skills:{
   component:defineAsyncComponent(() => import('../../form/SkillsForm.vue')),
   props:{},
   add:() => {},
   delete:() => {}
  },
  portofolio:{
    component:asyncGenericComponent,
    props:genericConfig['portofolio'].props,
    add:genericConfig['portofolio'].emit.addData,
    delete:genericConfig['portofolio'].emit.deleteData
  },
  language:{
   component:defineAsyncComponent(() => import('../../form/LanguageForm.vue')),
   props:{},
   add:() => {},
   delete:() => {}
  },
  volunteering:{
   component:asyncGenericComponent,
   props:genericConfig['volunteering'].props,
   add:genericConfig['volunteering'].emit.addData,
   delete:genericConfig['volunteering'].emit.deleteData
  },
  courses:{
   component:asyncGenericComponent,
   props:genericConfig['course'].props,
   add:genericConfig['course'].emit.addData,
   delete:genericConfig['course'].emit.deleteData
  },
  additionalInformation:{
   component:defineAsyncComponent(() => import('../../form/AdditionalInformation.vue')),
   props:{},
   add:() => {},
   delete:() => {}
  } 
 } as const
}