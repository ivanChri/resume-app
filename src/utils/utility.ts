import { useUserStore } from "../store/user.store";
import html2pdf from "html2pdf.js";
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
}
export async function exportPdf():Promise<void>{
  const container = document.getElementById('main-themes') as HTMLDivElement
  const viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null
  const originalContent = viewport?.content || "width=device-width, initial-scale=1"
  if (viewport) viewport.content = "width=1200";
  const opt = {
  margin:[10, 10, 10, 10],
  filename:'document.pdf',
  image:{ type: 'jpeg', quality: 0.98 },
  html2canvas:{ 
    scale: 2,
    useCORS: true,
    logging: false,
  },
  jsPDF:{ 
    unit: 'mm', 
    format: 'a4', 
    orientation: 'portrait',
    windowWidth:1200
  },
  pagebreak: {
    mode: ['css', 'legacy'],
    before: '.break-before-page',
    avoid: '.break-inside-avoid',
  }
 } as any
  try {
    await html2pdf().set(opt).from(container).save()
  } catch (error) {
    console.error("Gagal export PDF:", error)
  } finally {
    if (viewport) {
      viewport.content = originalContent
    }
  }
}