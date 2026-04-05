<script setup lang="ts">
 import { useUserStore } from '../store/user.store';
 import { generateRandomId } from '../utils/utility/utility';
 import AccordionList from '../component/AccordionList.vue';
 import type { levelName } from '../utils/types/form.interface';
 const store = useUserStore()
 const skillsButtonObj:{level:levelName,style:string,activeStyle:string}[] = [
  {
   level:'Beginner',
   style:'border-green-400 bg-green-100 hover:bg-green-300',
   activeStyle:'bg-green-600'
  },
  {
   level:'Intermediate',
   style:'border-yellow-400 bg-yellow-100 hover:bg-yellow-300',
   activeStyle:'bg-yellow-600'
  },
  {
   level:'Experienced',
   style:'border-red-400 bg-red-100 hover:bg-red-300',
   activeStyle:'bg-red-600'
  },
  {
    level:'Expert',
    style:'border-blue-400 bg-blue-100 hover:bg-blue-300',
    activeStyle:'bg-blue-600'
  }
]
 function addSkills():void{
  store.skills.push({
   id:generateRandomId(),
   name:'',
   level:null
  })
 }
 function findIndex(id:string):number{
   return store.skills.findIndex((item) => item.id === id)
 }
 function updateLevel(itemId:string,level:levelName):void{
   const index = findIndex(itemId)
   if(index !== -1) store.skills[index].level = level
 }
 function deleteSkills(itemId:string):void{
  const index = findIndex(itemId)
  if(index !== -1) store.skills.splice(index,1)
 }
</script>

<template>
  <section class="skills-container p-1 w-full flex flex-col gap-2">
    <div class="info mb-1 p-1">
     <h1 class="p-1 text-xl my-1 font-semibold">Skills</h1>
     <p class="text-md leading-relaxed">Choose 5 important skills that show you fit the position.Make sure they match the key skills mentioned in the job listing (especially when applying via a online system)</p>
    </div>
    <AccordionList
     :items="store.skills"
     title-key="name"
     @add="addSkills"
     @delete="deleteSkills"
    >
    <template #default="{ item }">
    <div class="content p-1 grid grid-cols-1 md:grid-cols-2 gap-2">
      <div class="flex flex-col p-1 gap-3 w-[100%] md:w-[80%]">
       <label for="skillName">Skill</label>
       <input type="text" v-model="item.name" id="skillName" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
      </div>
      <div class="p-1 flex flex-col gap-3">
        <div class="level-title p-1">
         <span class="font-light">Level - </span>
         <span class="font-semibold">{{ item.level }}</span>
        </div>
        <div class="toolbar flex gap-1">
          <button v-for="(value,index) in skillsButtonObj" :key="index" 
           class="rounded-md p-2 w-[50px] border-1" 
           :class="[value.style,{[value.activeStyle]:item.level === value.level}]"
           @click="updateLevel(item.id,value.level)">
            H
          </button>
        </div>
      </div>
    </div>
    </template>
    <template #buttonName>Add Skills</template>
    </AccordionList>
  </section>
</template>