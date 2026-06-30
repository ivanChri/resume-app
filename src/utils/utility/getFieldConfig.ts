import { fieldConfig } from "../config/fieldConfig";
import type { fieldConfigData } from "../types/component.interface";
export function getFieldConfig(parent:string):fieldConfigData{
 return {
  title:fieldConfig[parent].title || 'Title',
  sub:fieldConfig[parent].sub || 'Subtitle',
  labelName:fieldConfig[parent].labelName,
  useMonthPicker:fieldConfig[parent].useMonthPicker,
  useMonthPickerStatus:fieldConfig[parent].useMonthPickerStatus,
  statusLabel:fieldConfig[parent].statusLabel,
  showCity:fieldConfig[parent].showCity,
  showLink:fieldConfig[parent].showLink,
  showEmploymentType:fieldConfig[parent].showEmploymentType
 }
}
