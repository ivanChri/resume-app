import { defineAsyncComponent } from 'vue';
import { genericConfigGenerator } from './genericConfig.ts';
import type { componentRegisrty } from '../types/component.interface.ts';
export function getComponent():componentRegisrty{
 const genericConfig = genericConfigGenerator()
  return {
   biodata:{
    component:defineAsyncComponent(() => import('../../form/BiodataForm.vue')),
    props:{},
    add:() => {},
    delete:() => {}
  },
  experience:{
   component:defineAsyncComponent(() => import('../../form/GenericList.vue')),
   props:genericConfig['experience'].props,
   add:genericConfig['experience'].emit.addData,
   delete:genericConfig['experience'].emit.deleteData
  },
  education:{
   component:defineAsyncComponent(() => import('../../form/GenericList.vue')),
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
  portfolio:{
   component:defineAsyncComponent(() => import('../../form/GenericList.vue')),
   props:genericConfig['portfolio'].props,
   add:genericConfig['portfolio'].emit.addData,
   delete:genericConfig['portfolio'].emit.deleteData
  },
  language:{
   component:defineAsyncComponent(() => import('../../form/LanguageForm.vue')),
   props:{},
   add:() => {},
   delete:() => {}
  },
  volunteering:{
   component:defineAsyncComponent(() => import('../../form/GenericList.vue')),
   props:genericConfig['volunteering'].props,
   add:genericConfig['volunteering'].emit.addData,
   delete:genericConfig['volunteering'].emit.deleteData
  },
  organization:{
   component:defineAsyncComponent(() => import('../../form/GenericList.vue')),
   props:genericConfig['organization'].props,
   add:genericConfig['organization'].emit.addData,
   delete:genericConfig['organization'].emit.deleteData
  },
  courses:{
   component:defineAsyncComponent(() => import('../../form/GenericList.vue')),
   props:genericConfig['course'].props,
   add:genericConfig['course'].emit.addData,
   delete:genericConfig['course'].emit.deleteData
  },
  additionalInformation:{
   component:defineAsyncComponent(() => import('../../form/AdditionalInformation.vue')),
   props:{},
   add:() => {},
   delete:() => {}
  },
  finalization:{
   component:defineAsyncComponent(() => import('../../form/FinalizationForm.vue')),
   props:{},
   add:() => {},
   delete:() => {}
  }
 } as const
}