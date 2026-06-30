import { getComponent } from "../config/componentsConfig"
import type { componentRegisrty } from "../types/component.interface"
export function getFinalizationComponent(){
 const components = getComponent()
 const obj:componentRegisrty = {}
 const keys = [
  'biodata',
  'experience',
  'eduaction',
  'summary',
  'socialMedia',
  'skills',
  'portfolio',
  'language',
  'volunteering',
  'courses',
  'additionalInformation',
  'organization'
 ]
 keys
  .filter((name) => components[name] && components[name].props !== undefined)
  .forEach((name) => {
  obj[name] = components[name]
 })
 return obj
}