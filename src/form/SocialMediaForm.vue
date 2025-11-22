<script setup lang="ts">
 import { useUserStore } from '../store/user.store';
 import { generateRandomId } from '../utils/utility';
 import AccordionList from '../component/AccordionList.vue';
 const store = useUserStore()
 function addSocialMedia():void{
  store.socialMedia.push({
    id:generateRandomId(),
    label:'',
    link:''
  })
 }
 function deleteSocialMedia(itemId:string):void{
  const index = store.socialMedia.findIndex((item) => item.id == itemId)
  if(index !== -1) store.socialMedia.splice(index,1)
 }
</script>

<template>
  <section class="skills-container p-1 w-full">
  <AccordionList 
   :items="store.socialMedia" 
   title-key="label"
   @add="addSocialMedia"
   @delete="deleteSocialMedia">
    <template #default="{ item }">
     <div class="content flex gap-6">
      <div class="flex flex-col p-1 gap-2">
       <label for="label">Label</label>
       <input type="text" v-model="item.label" id="label" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
      </div>
      <div class="flex flex-col p-1 gap-2 grow-1">
       <label for="link">Link</label>
       <input type="url" v-model="item.link" id="link" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
      </div>
     </div>
    </template>
    <template #button-label>Add Link</template>
  </AccordionList>
  </section>
</template>