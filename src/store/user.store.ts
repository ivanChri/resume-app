import { defineStore } from "pinia";
import { ref } from "vue";
import type { 
  biodata,
  workExperice,
  education,
  socialMedia,
  skills,
  portfolio,
  course,
  language,
  volunteering,
  organization
 } from "../utils/types/form.interface";
export const useUserStore = defineStore('user',() => {
  const biodata = ref<biodata>({
    jobTitle:'',
    photoPreview:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    address:'',
    dateOfBirth:'',
    placeOfBirth:'',
    city:'',
    country:'',
    postalCode:'',
    drivingLicense:'',
    nationality:''
  })
  const socialMedia = ref<socialMedia[]>([])
  const experience = ref<workExperice[]>([])
  const education = ref<education[]>([])
  const summary = ref<string>('')
  const additionalInformation = ref<string>('')
  const skills = ref<skills[]>([])
  const portfolio = ref<portfolio[]>([])
  const courses = ref<course[]>([])
  const language = ref<language[]>([])
  const volunteering = ref<volunteering[]>([])
  const organization = ref<organization[]>([])
  const setPhotoPreview = (data:string):void => {
    biodata.value.photoPreview = data
  }
  const resetAdditionalInformationData = () => additionalInformation.value = ''
  const resetSkillsData = () => skills.value.length = 0
  const resetPortfolioData = () => portfolio.value.length = 0
  const resetCourseData = () => courses.value.length = 0
  const resetLanguageData = () => language.value.length = 0
  const  resetVolunteeringData = () => volunteering.value.length = 0
  return {
    biodata,
    experience,
    education,
    socialMedia,
    skills,
    summary,
    portfolio,
    courses,
    language,
    volunteering,
    additionalInformation,
    organization,
    setPhotoPreview,
    resetAdditionalInformationData,
    resetSkillsData,
    resetPortfolioData,
    resetCourseData,
    resetLanguageData,
    resetVolunteeringData
  }
},{ 
  persist:{
    key:'user-store',
    omit:['biodata.photoPreview']
  } 
})