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
  <div class="info mb-1 p-1">
    <h1 class="p-1 text-xl my-1 font-semibold">Website & Social Links</h1>
    <p class="text-md leading-relaxed">You can add links to website you want hiring manager to see,perhaps it will be a link to your social media,LinkedIn profile,github profile or personal website.</p>
  </div>
  <AccordionList 
   :items="store.socialMedia" 
   title-key="label"
   @add="addSocialMedia"
   @delete="deleteSocialMedia">
    <template #default="{ item }">
<<<<<<< HEAD
     <div class="content flex grid grid-cols-1 md:grid-cols-2 gap-y-1">
=======
     <div class="content flex gap-6">
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
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
    <template #buttonName>Add Social Links</template>
  </AccordionList>
  </section>
</template>