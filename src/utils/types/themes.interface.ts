import type { 
  workExperice,
  education,
  skills,
  socialMedia,
  portofolio,
  course,
  volunteering,
  language
} from "./form.interface";

export interface themesProps {
  header:{
    firstName:string,
    lastName:string,
    jobTitle:string,
    photoPreview:string,
    email:string,
    phone:string
  },
  addtionalDetails:{
   id:string,
   name:string,
   value:string
  }[],
  summary:string,
  experience:workExperice[],
  education:education[],
  skills:skills[],
  socialMedia:socialMedia[],
  portofolio:portofolio[],
  course:course[],
  volunteering:volunteering[],
  language:language[],
  addtionalInformation:string
}

export interface themesConfigProps {
  primaryFontsFamily:string,
  secondaryFontsFamily:string
  fontsSize:string,
  lineHeight:string,
  supportedIcons:boolean,
  iconColorAccents:string,
  supportedPhotos:boolean
}

export interface themesConfig {
  primaryFontFamily:string,
  secondaryFontFamily:string,
  fontSize:number,
  lineHeight:number
}

export interface themesData {
  name:string,
  supportedUserPhoto:boolean,
  themesImgUrl:string,
  supportedIcon:boolean,
  iconColorAccents:string
}

export interface resumeThemeStyle {
  base: string;
  header: string;
  infoHeader: string;
  name: string;
  jobTitle: string;
  sectionTitle: string;
  contact: string;
  additionalInfo: string;
  main: string;
  sectionItem: string;
  sectionHeader: string;
  sectionHeaderTitle: string;
  sectionHeaderInfo: string;
  summary: string;
  summaryContent: string;
  sectionDesc: string;
  additionalSectionItem: string;
  additionalSectionHeader: string;
  additionalSectionInfo: string;
}