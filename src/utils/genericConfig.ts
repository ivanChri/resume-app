import { createPinia } from "pinia";
import { useUserStore } from "../store/user.store";
import { generateRandomId } from "./utility";
import type { workExperice,education,awards,portofolio,volunteering,course } from "./form.interface";
interface genericData<T> {
  parent:string,
  data:T[],
  initialData:T
}
type GenericListConfig<T extends Record<string,any>> = {
  [K in keyof T]: genericData<T[K]>
}
type config = {
  experience:workExperice
  education:education
  awards:awards
  portofolio:portofolio
  volunteering:volunteering
  course:course
}
const pinia = createPinia()
const userStore = useUserStore(pinia)
export const genericConfigProps:GenericListConfig<config>= {
  experience:{
    parent:'experience',
    data:userStore['experience'],
    initialData:{
      id:'',
      jobTitle:'',
      employer:'',
      startDate:'',
      endDate:'',
      city:'',
      description:''
    }
  },
  education:{
    parent:'education',
    data:userStore['education'],
    initialData:{
      id:'',
      schoolName:'',
      degree:'',
      startDate:'',
      endDate:'',
      city:'',
      description:''
    }
  },
  awards:{
    parent:'awards',
    data:userStore['awards'],
    initialData:{
     id:generateRandomId(),
     awardsName:'',
     institution:'',
     year:'',
     description:'',
    }
  },
  portofolio:{
    parent:'portofolio',
    data:userStore['portofolio'],
    initialData:{
      id:generateRandomId(),
      projectName:'',
      projectType:'',
      projectLink:'',
      startDate:'',
      endDate:'',
      description:''
    }
  },
  volunteering:{
    parent:'volunteering',
    data:userStore['volunteering'],
    initialData:{
      id:generateRandomId(),
      role:'',
      institution:'',
      startDate:'',
      endDate:'',
      city:'',
      description:''
    }
  },
  course:{
    parent:'course',
    data:userStore['course'],
    initialData:{
      id:generateRandomId(),
      courseName:'',
      institution:'',
      startDate:'',
      endDate:'',
      description:''
    }
  }
}
