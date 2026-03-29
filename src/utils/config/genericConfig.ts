import { useUserStore } from "../../store/user.store";
import type { workExperice, education, portofolio, volunteering, course } from "../types/form.interface";
import type { genericData } from "../types/component.interface";
type GenericListConfig<T extends Record<string, any>> = {
  [K in keyof T]: genericData<T[K]>
}
type config = {
  experience: workExperice
  education: education
  portofolio: portofolio
  volunteering: volunteering
  course: course
}
export function genericConfigGenerator(): GenericListConfig<config> {
  const userStore = useUserStore()
  return {
    experience: {
      props: {
        parent: 'experience',
        data: userStore['experience'],
        initialData: {
          id: '',
          jobTitle: '',
          employer: '',
          startDate: '',
          endDate: '',
          city: '',
          employmentTypes: null,
          description: ''
        },
        keys: {
          id: 'id',
          title: 'jobTitle',
          sub: 'employer',
          startDate: 'startDate',
          endDate: 'endDate',
          city: 'city',
          employmentTypes: 'employmentTypes',
          description: 'description'
        },
        infoText: 'Use this section to show what you achieved in each role. Recruiters notice results more than duties.',
      },
      emit:{
        addData(data){
          userStore['experience'].push(data)
        },
        deleteData(index){
          if(index !== -1) userStore['experience'].splice(index,1)
        }
      }
    },
    education: {
      props: {
        parent: 'education',
        data: userStore['education'],
        initialData: {
          id: '',
          schoolName: '',
          degree: '',
          startDate: '',
          endDate: '',
          city: '',
          description: ''
        },
        keys: {
          id: 'id',
          title: 'schoolName',
          sub: 'degree',
          startDate: 'startDate',
          endDate: 'endDate',
          city: 'city',
          description: 'description'
        },
        infoText: 'Show where you studied and what you learned so employers can see your expertise.',
      },
      emit:{
        addData(data){
          userStore['education'].push(data)
        },
        deleteData(index){
         if(index !== -1) userStore['education'].splice(index,1)
        }
      }
    },
    portofolio: {
      props: {
        parent: 'portofolio',
        data: userStore['portofolio'],
        initialData: {
          id: '',
          projectName: '',
          projectType: '',
          projectLink: '',
          startDate: '',
          endDate: '',
          description: ''
        },
        keys: {
          id: 'id',
          title: 'projectName',
          sub: 'projectType',
          startDate: 'startDate',
          endDate: 'endDate',
          link: 'projectLink',
          description: 'description'
        },
        infoText: null,
      },
      emit:{
        addData(data){
          userStore['portofolio'].push(data)
        },
        deleteData(index){
         if(index !== -1) userStore['portofolio'].splice(index,1)
        }
      }
    },
    volunteering: {
      props: {
        parent: 'volunteering',
        data: userStore['volunteering'],
        initialData: {
          id: '',
          role: '',
          institution: '',
          startDate: '',
          endDate: '',
          city: '',
          description: ''
        },
        keys: {
          id: 'id',
          title: 'role',
          sub: 'institution',
          startDate: 'startDate',
          endDate: 'endDate',
          city: 'city',
          description: 'description'
        },
        infoText: null,
      },
      emit:{
        addData(data){
          userStore['volunteering'].push(data)
        },
        deleteData(index){
         if(index !== -1) userStore['volunteering'].splice(index,1)
        }
      }
    },
    course: {
      props: {
        parent: 'course',
        data: userStore['courses'],
        initialData: {
          id: '',
          courseName: '',
          institution: '',
          startDate: '',
          endDate: '',
          description: ''
        },
        keys: {
          id: 'id',
          title: 'courseName',
          sub: 'institution',
          startDate: 'startDate',
          endDate: 'endDate',
          city: 'city',
          description: 'description'
        },
        infoText: null,
      },
      emit:{
        addData(data){
          userStore['courses'].push(data)
        },
        deleteData(index){
         if(index !== -1) userStore['courses'].splice(index,1)
        }
      }
    }
  } as const
}