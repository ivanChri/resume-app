<script setup lang="ts">
 import { useUserStore } from '../store/user.store';
 import AccordionList from '../component/AccordionList.vue';
 import Dropdow from '../component/Dropdow.vue';
 import { generateRandomId } from '../utils/utility';
 import type { languageSpeakingLevel } from '../utils/types/form.interface';
 const store = useUserStore()
 const language:languageSpeakingLevel[] = ['Native Speaker','Highly Proficient','Very Good Command']
 function addLanguage():void{
    store.language.push({
     id:generateRandomId(),
     languageName:'',
     languageLevel:null
   })
 }
 function findIndex(id:string):number{
   return store.language.findIndex((item) => item.id == id)
 }
 function deleteLanguage(itemId:string):void{
  const index = findIndex(itemId)
  if(index !== -1) store.language.splice(index,1)
 }
</script>

<template>
  <section class="language-container p-1 w-full">
    <AccordionList
     :items="store.language" 
     title-key="languageName"
     @add="addLanguage"
     @delete="deleteLanguage">
      <template #default="{ item }">
       <div class="content p-1 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div class="flex flex-col p-1 gap-3 w-[100%] md:w-[80%]">
         <label for="languageName">Language</label>
         <input type="text" v-model="item.languageName" id="languageName" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
        </div>
        <div class="dropdown-container mt-8">
          <Dropdow v-model:selected-option="item.languageLevel" :options="language"></Dropdow>   
        </div>
      </div>
     </template>
     <template #buttonName>Add Language</template>
    </AccordionList>
  </section>
</template>