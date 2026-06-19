import type { fieldConfigData } from "../types/component.interface"
export const fieldConfig:Record<string,fieldConfigData> = {
   experience: {
    title:'JobTitle',
    sub:'Employer',
    showCity:true,
    showLink:false,
    showEmploymentType:true,
    labelName:'Start & End Date',
    statusLabel:'Currently Working Here',
    useMonthPicker:true,
    useMonthPickerStatus:true
  },
   education:{
    title:'SchoolName',
    sub: 'Degree',
    showCity: true,
    showLink: false,
    showEmploymentType:false,
    labelName: "Start & End Date",
    statusLabel: "Currently Study Here",
    useMonthPicker: true,
    useMonthPickerStatus:true
  },
   portofolio:{
    title:'ProjectName',
    sub:'ProjectType',
    showCity: false,
    showLink: true,
    showEmploymentType:false,
    labelName: "Start & End Date",
    statusLabel: null,
    useMonthPicker: true,
    useMonthPickerStatus:false
  },
   course:{
    title:'Course',
    sub:'Institution',
    showCity: false,
    showLink: false,
    showEmploymentType:false,
    labelName: "Start & End Date",
    statusLabel: null,
    useMonthPicker: true,
    useMonthPickerStatus:false
  },
  volunteering:{
    title:'Role',
    sub:'Institution',
    showCity: true,
    showLink: false,
    showEmploymentType:false,
    labelName: "Start & End Date",
    statusLabel: "Currently Volunteering Here",
    useMonthPicker: true,
    useMonthPickerStatus:true
  }
 } as const

export const labelConfig = {
   experience:{
    title:'Employment History',
    buttonLabel:'Add Experience',
   },
   education:{
    title:'Education',
    buttonLabel:'Add Education'
   },
   portofolio:{
    title:'Portofolio/Personal Project',
    buttonLabel:'Add Portofolio'
   },
   course:{
    title:null,
    buttonLabel:'Add Course'
   },
   awards:{
    title:null,
    buttonLabel:'Add Awards'
   },
   volunteering:{
    title:null,
    buttonLabel:'Add Volunteering'
   }
 } as const
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
export const fontSizeValue = ['text-xs','text-base','text-lg'] as const
export const lineHeightValue = ['leading-[1.3]','leading-[1.5]','leading-[1.7]','leading-[1.9]'] as const
export const fontsFamilyValue:Record<string,string> = {
  Monospace:'var(--font-mono)',
  Roboto:'var(--font-roboto)',
  Montserrat:'var(--font-montserrat)',
  'Open-sans':'var(--font-opensans)'
} as const