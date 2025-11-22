<script setup lang="ts">
 import { useUserStore } from '../store/user.store';
 import AccordionList from '../component/AccordionList.vue';
 import ContentForm from '../component/ContentForm.vue';
 import DescriptionForm from '../component/DescriptionForm.vue';
 import { generateRandomId } from '../utils/utility';
 const store = useUserStore()
 function addCourse():void{
  store.course.push({
   id:generateRandomId(),
   courseName:'',
   institution:'',
   startDate:'',
   endDate:'',
   description:''
  })
 }
 function deleteCourse(itemId:string):void{
  const index = store.course.findIndex((item) => item.id == itemId)
  if(index !== -1) store.course.splice(index,1)
 }
</script>

<template>
  <section class="course-container p-1 w-full">
    <AccordionList
     :items="store.course" 
     title-key="courseName"
     @add="addCourse"
     @delete="deleteCourse">
      <template #default="{ item }">
        <ContentForm 
         parent="course"
         v-model:title-model="item.courseName"
         v-model:sub-model="item.institution"
         v-model:start-date-model="item.startDate"
         v-model:end-date-model="item.endDate">
          <DescriptionForm v-bind:description-model="item.description"></DescriptionForm>
        </ContentForm>
      </template>
      <template #button-label>Add Course</template>
    </AccordionList>
  </section>
</template>