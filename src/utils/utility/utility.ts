import { useUserStore } from "../../store/user.store";
export function generateRandomId(length: number = 10): string {
  const randomPart = Math.random().toString(36).substring(2)
  if (randomPart.length < length) {
    return (randomPart + Math.random().toString(36).substring(2)).substring(0, length)
  }
  return randomPart.substring(0, length)
}
export function getOptionalDataResetHandler(name:string):void{
  const userStore = useUserStore()
  switch(name){
    case 'courses':
     userStore.resetCourseData()
     return
    case 'skills':
     userStore.resetSkillsData()
     return
    case 'portofolio':
     userStore.resetPortofolioData()
     return
    case 'language':
     userStore.resetLanguageData()
     return
    case 'volunteering':
     userStore.resetVolunteeringData()
     return
    case 'additionalInformation':
     userStore.resetAdditionalInformationData()
     return
  }
}