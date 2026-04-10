import { defineStore } from "pinia";
import { ref } from "vue";
import type { finalizationComponentData } from "../utils/types/component.interface";
export const useComponentStore = defineStore('component',() => {
  const finalizationComponent = ref<finalizationComponentData[]>([
    {
     id:'biodata',
     key:'Biodata',
     componentName:'biodata',
     isRequired:true,
     order:1,
    },
    {
     id:'summary',
     key:'Profesinal Summary',
     componentName:'summary',
     isRequired:true,
     order:2,
    },
    {
     id:'education',
     key:'Education',
     componentName:'education',
     isRequired:true,
     order:3,
    },
    {
     id:'experience',
     key:'Working Experience',
     componentName:'experience',
     isRequired:true,
     order:4,
    },
    {
     id:'socialMedia',
     key:'Website & Social Links',
     componentName:'socialMedia',
     isRequired:true,
     order:5
    },
    {
     id:'skills',
     key:'Skills',
     componentName:'skills',
     isRequired:true,
     order:6
    }
  ].sort((a,b) => a.order - b.order))
  function addComponent(key:string,componentName:string):void{
   const length = finalizationComponent.value.length + 1
   finalizationComponent.value.push({
     id:componentName,
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