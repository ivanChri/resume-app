<script setup lang="ts">
 import { useUserStore } from '../store/user.store';
 import AccordionList from '../component/AccordionList.vue';
 import DescriptionForm from '../component/DescriptionForm.vue';
 import ContentForm from '../component/ContentForm.vue';
 import { generateRandomId } from '../utils/utility';
 const store = useUserStore()
 function addPortofolio():void{
  store.portofolio.push({
    id:generateRandomId(),
    projectName:'',
    projectType:'',
    projectLink:'',
    startDate:'',
    endDate:'',
    description:''
  })
 }
 function deletePortofolio(itemId:string):void{
  const index = store.portofolio.findIndex((item) => item.id == itemId)
  if(index !== -1) store.portofolio.splice(index,1)
 }
</script>

<template>
  <section class="portofolio-container p-1 w-full">
    <AccordionList
     :items="store.portofolio"
     title-key="projectName"
     @add="addPortofolio"
     @delete="deletePortofolio">
     <template #default="{ item }">
      <ContentForm
       parent="portofolio"
       v-model:title-model="item.projectName"
       v-model:sub-model="item.projectType"
       v-model:start-date-model="item.startDate"
       v-model:end-date-model="item.endDate">
         <DescriptionForm v-model:description-model="item.description"></DescriptionForm>
       </ContentForm>   
     </template>
     <template #button-label>Add Portofolio</template>
    </AccordionList>
  </section>
</template>