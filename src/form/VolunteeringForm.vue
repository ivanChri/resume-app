<script setup lang="ts">
 import { useUserStore } from '../store/user.store';
 import AccordionList from '../component/AccordionList.vue';
 import ContentForm from '../component/ContentForm.vue';
 import DescriptionForm from '../component/DescriptionForm.vue';
 import { generateRandomId } from '../utils/utility';
 const store = useUserStore()
 function addVolunteeringProject():void{
   store.volunteering.push({
     id:generateRandomId(),
     role:'',
     institution:'',
     startDate:'',
     endDate:'',
     city:'',
     description:''
   })
 }
 function deleteVolunteeringProject(itemId:string):void{
   const index = store.volunteering.findIndex((item) => item.id == itemId)
   if(index !== -1) store.volunteering.splice(index,1)
 }
</script>

<template>
  <section class="volunteering-container p-1 w-full">
    <AccordionList
     :items="store.volunteering"
     title-key="role"
     @add="addVolunteeringProject"
     @delete="deleteVolunteeringProject">
      <template #default="{ item }">
        <ContentForm 
         parent="volunteering"
         v-model:title-model="item.role"
         v-model:sub-model="item.institution"
         v-model:start-date-model="item.startDate"
         v-model:end-date-model="item.endDate"
         v-model:city-model="item.city">
          <DescriptionForm v-bind:description-model="item.description"></DescriptionForm>
        </ContentForm>
      </template>
      <template #button-label>Add Comunity volunteering</template>
    </AccordionList>
  </section>
</template>