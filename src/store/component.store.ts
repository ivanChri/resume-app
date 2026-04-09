import { defineStore } from "pinia";
import { ref } from "vue";
import type { finalizationComponentData } from "../utils/types/component.interface";
export const useComponentStore = defineStore('component',() => {
  const finalizationComponent = ref<finalizationComponentData[]>([
    {
     id:'component-1',
     key:'Biodata',
     componentName:'biodata',
     isRequired:true,
     order:1,
    },
    {
     id:'component-2',
     key:'Profesinal Summary',
     componentName:'summary',
     isRequired:true,
     order:2,
    },
    {
     id:'component-3',
     key:'Education',
     componentName:'education',
     isRequired:true,
     order:3,
    },
    {
     id:'component-4',
     key:'Working Experience',
     componentName:'experience',
     isRequired:true,
     order:4,
    },
    {
     id:'component-5',
     key:'Website & Social Links',
     componentName:'socialMedia',
     isRequired:true,
     order:5
    },
    {
     id:'component-6',
     key:'Skills',
     componentName:'skills',
     isRequired:true,
     order:6
    }
  ].sort((a,b) => a.order - b.order))
  function addComponent(key:string,componentName:string):void{
   const length = finalizationComponent.value.length + 1
   finalizationComponent.value.push({
     id:`component-${length}`,
     key,
     componentName,
     isRequired:false,
     order:length,
   })
  }
  function deleteComponent(index:number):void{
    finalizationComponent.value.splice(index,1)
  }
  return {
    finalizationComponent,
    addComponent,
    deleteComponent
  }
},{
  persist:{
    key:'component-store'
  }
})