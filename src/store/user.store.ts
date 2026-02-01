import { defineStore } from "pinia";
import { ref } from "vue";
import type { 
  biodata,
  workExperice,
  education,
  socialMedia,
  skills,
  portofolio,
  course,
  language,
  volunteering,
 } from "../utils/form.interface";
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
  const portofolio = ref<portofolio[]>([])
  const courses = ref<course[]>([])
  const language = ref<language[]>([])
  const volunteering = ref<volunteering[]>([])
  const setPhotoPreview = (file:File):void => {
    biodata.value.photoPreview = URL.createObjectURL(file)
  }
  return {
    biodata,
    setPhotoPreview,
    experience,
    education,
    socialMedia,
    skills,
    summary,
    portofolio,
    courses,
    language,
    volunteering,
    additionalInformation
  }
})