import { getComponent } from '../config/componentsConfig.ts';
import type { formControllerComponent } from '../types/component.interface.ts';
export function getFormComponent():formControllerComponent[]{
  const components = getComponent()
  const componentKeys = [
   {
    name:'biodata',
    buttonName:'Personal Info'
   },
   {
    name:'experience',
    buttonName:'Work Experience'
   },
   {
    name:'education',
    buttonName:'Education'
   },
   {
    name:'socialMedia',
    buttonName:'Social Media'
   },
   {
    name:'skills',
    buttonName:'Skills'
   },
   {
    name:'summary',
    buttonName:'Profesional Summary'
   },
   {
    name:'finalization',
    buttonName:'finish'
   }
  ]
  const map = componentKeys
   .filter((item) => components[item.name] && components[item.name].props !== undefined)
   .map((item) => {
     return {
      ...components[item.name],
      ...item
     }
   })
  return map
}