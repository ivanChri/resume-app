<script setup lang="ts"> 
 import { useUserStore } from '../store/user.store';
 import AccordionList from '../component/AccordionList.vue';
 import ContentForm from '../component/ContentForm.vue';
 import DescriptionForm from '../component/DescriptionForm.vue';
 import { generateRandomId } from '../utils/utility';
 const store = useUserStore()
 function addEducation():void{
  store.education.push({
    id:generateRandomId(),
    schoolName:'',
    degree:'',
    startDate:'',
    endDate:'',
    city:'',
    description:''
  })
 }
 function deleteEducation(itemId:string):void{
  const index = store.education.findIndex((item) => item.id == itemId)
  if(index !== -1) store.education.splice(index,1)
 }
</script>

<template>
  <section class="education-container p-1 w-full">
    <AccordionList 
     :items="store.education"
     title-key="schoolName"
     @add="addEducation"
     @delete="deleteEducation"
     >
      <template #default="{item}">
        <ContentForm 
         parent="education"
         v-model:title-model="item.schoolName"
         v-model:sub-model="item.degree"
         v-model:start-date-model="item.startDate"
         v-model:end-date-model="item.endDate"
         v-model:city-model="item.city">
          <DescriptionForm v-model:description-model="item.description"></DescriptionForm>
        </ContentForm>
      </template>
      <template #button-label>Add Education</template>
    </AccordionList>
  </section>
</template>