import { useUserStore } from "../../store/user.store";
import type { sectionArray } from "../types/themes.interface";
export function getSectionConfig():Record<string,sectionArray[number]>{
 const userStore = useUserStore()
 const templateConfig:Record<string,sectionArray[number]> = {
    experience: {
    name:'experience',
    data:userStore.experience.filter((item) => item.jobTitle),
    keys:{
     id:'id',
     title:'jobTitle',
     sub:'employer',
     startDate:'startDate',
     endDate:'endDate',
     employmentTypes:'employmentTypes',
     description:'description'
    }
   },
   education:{
    name:'education',
    data:userStore.education.filter((item) => item.schoolName || item.degree),
    keys:{
      id:'id',
      title:'schoolName',
      sub:'degree',
      startDate:'startDate',
      endDate:'endDate',
      description:'description'
    }
   },
   portfolio:{
    name:'portfolio',
    data:userStore.portfolio.filter((item) => item.projectName),
    keys: {
      id:'id',
      title:'projectName',
      sub:'projectType',
      startDate:'startDate',
      endDate:'endDate',
      link:'projectLink',
      description:'description'
    },
   },
   volunteering:{
     name:'volunteering',
     data:userStore.volunteering.filter((item) => item.role),
     keys:{
      id:'id',
      title:'role',
      sub:'institution',
      startDate:'startDate',
      endDate:'endDate',
      city:'city',
      description:'description'
     }
    },
    organization:{
      name:'organization',
      data:userStore.organization.filter((item) => item.role),
      keys:{
       id:'id',
       title:'role',
       sub:'institution',
       startDate:'startDate',
       endDate:'endDate',
       city:'city',
       description:'description'
     }
    },
    course:{
      name:'course',
      data:userStore.courses.filter((item) => item.courseName),
      keys: {
        id:'id',
        title:'courseName',
        sub:'institution',
        startDate:'startDate',
        endDate:'endDate',
        city:'city',
        description:'description'
      }
    },
    skills:{
      name:'skills',
      data:userStore.skills.filter((item) => item.name),
      keys:{
        id:'id',
        title:'name',
        sub:'level'
      }
    },
    language:{
      name:'language',
      data:userStore.language.filter((item) => item.languageName),
      keys:{
        id:'id',
        title:'languageName',
        sub:'languageLevel'
      }
    }
  }
  return templateConfig
}