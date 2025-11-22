<script setup lang="ts">
 import { useUserStore } from '../store/user.store';
 import AccordionList from '../component/AccordionList.vue';
 import ContentForm from '../component/ContentForm.vue';
 import DescriptionForm from '../component/DescriptionForm.vue';
 import { generateRandomId } from '../utils/utility';
 const store = useUserStore()
 function addAwards():void{
   store.awards.push({
    id:generateRandomId(),
    awardsName:'',
    institution:'',
    year:null,
    description:''
   })
 }
 function deleteAwards(itemId:string):void{
  const index = store.awards.findIndex((item) => item.id == itemId)
  if(index !== -1) store.awards.splice(index,1)
 }
</script>

<template>
  <section class="awards-container p-1 w-full">
    <AccordionList 
     :items="store.awards"
     title-key="awardsName"
     @add="addAwards"
     @delete="deleteAwards">
      <template #default="{ item }">
        <ContentForm 
         parent="awards"
         v-model:title-model="item.awardsName"
         v-model:sub-model="item.institution"
         v-model:year-model="item.year">
          <DescriptionForm v-model:description-model="item.description"></DescriptionForm>
        </ContentForm>
      </template>
      <template #button-label>add Awards</template>
    </AccordionList>
  </section>
</template>