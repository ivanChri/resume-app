import { useUserStore } from "../store/user.store";
import html2pdf from "html2pdf.js";
import html2canvasPro from 'html2canvas-pro';
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
  const oldContainers = document.querySelectorAll('.html2canvas-container')
  oldContainers.forEach(el => el.remove())
  const container = document.getElementById('main-themes') as HTMLDivElement
  const viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null
  const originalContent = viewport?.content || "width=device-width, initial-scale=1"
  if (viewport) viewport.content = "width=1200";
  const opt = {
  margin:[10, 10, 10, 10],
  filename:'document.pdf',
  image:{ type: 'jpeg', quality: 0.98 },
  html2canvas:{
    canvas:null,
    html2canvas: html2canvasPro,
    scale: 2,
    windowWidth:1200,
    useCORS: true,
    logging: false,
    letterRendering: true,
    allowTaint: false,
    onclone: (clonedDoc:any) => {
      clonedDoc.documentElement.className = document.documentElement.className
      clonedDoc.body.className = document.body.className
      const styleElements = document.querySelectorAll('style')
      styleElements.forEach(s => {
       const newStyle = clonedDoc.createElement('style')
       newStyle.innerHTML = s.innerHTML;
       clonedDoc.head.appendChild(newStyle);
      })
      const clonedContainer = clonedDoc.getElementById('main-themes')
      if (clonedContainer) {
      const computedStyle = window.getComputedStyle(container)
      clonedContainer.style.backgroundColor = computedStyle.backgroundColor
      clonedContainer.style.color = computedStyle.color
      clonedContainer.style.fontFamily = computedStyle.fontFamily
     }
    }
  },
  jsPDF:{ 
    unit: 'mm', 
    format: 'a4', 
    orientation: 'portrait',
  },
  pagebreak: {
    mode: ['css', 'legacy'],
    before: '.break-before-page',
    avoid: '.break-inside-avoid',
  }
 } as any
  try {
    await document.fonts.ready
    await new Promise<any>((resolve) => setTimeout(resolve,1500))
    await html2pdf().set(opt).from(container).save()
  } catch (error) {
    console.error("Gagal export PDF:", error)
  } finally {
    if (viewport) {
      viewport.content = originalContent
    }
    setTimeout(() => {
      document.querySelectorAll('.html2canvas-container').forEach(el => el.remove())
    }, 1000)
  }
}