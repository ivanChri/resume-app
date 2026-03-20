import { useUserStore } from "../store/user.store";
<<<<<<< HEAD
import html2pdf from "html2pdf.js";
=======
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
export function generateRandomId(length: number = 10): string {
  const randomPart = Math.random().toString(36).substring(2);
  if (randomPart.length < length) {
    return (randomPart + Math.random().toString(36).substring(2)).substring(0, length);
  }
  return randomPart.substring(0, length);
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
<<<<<<< HEAD
}
export function print(){
  const container = document.getElementById('test') as HTMLDivElement
  const opt = {
  margin:[10, 10, 10, 10],
  filename:'document.pdf',
  image:{ type: 'jpeg', quality: 0.98 },
  html2canvas:{ 
    scale: 2,
    useCORS: true,
    logging: false
  },
  jsPDF:{ 
    unit: 'mm', 
    format: 'a4', 
    orientation: 'portrait' 
  },
  pagebreak: {
    mode: ['css', 'legacy'],
    before: '.break-before-page',
    avoid: '.break-inside-avoid',
  }
 } as any;
  html2pdf().set(opt).from(container).save();
=======
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
}