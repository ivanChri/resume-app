<script setup lang="ts" generic="T extends {id:string}">
 import { computed } from 'vue';
 import { generateRandomId } from '../utils/utility';
 import type { genericProps } from '../utils/component.interface';
 import AccordionList from '../component/AccordionList.vue';
 import ContentForm from '../component/ContentForm.vue';
 import DescriptionForm from '../component/DescriptionForm.vue';
 const props = defineProps<genericProps<T>>()
 const emit = defineEmits<{
   (e:'add',data:T):void,
   (e:'delete',index:number):void
 }>()
 const labelConfig = {
   experience:{
    title:'Employment History',
    buttonLabel:'Add Experience',
   },
   education:{
    title:'Education',
    buttonLabel:'Add Education'
   },
   portofolio:{
    title:'Portofolio/Personal Project',
    buttonLabel:'Add Portofolio'
   },
   course:{
    title:null,
    buttonLabel:'Add Course'
   },
   awards:{
    title:null,
    buttonLabel:'Add Awards'
   },
   volunteering:{
    title:null,
    buttonLabel:'Add Volunteering'
   }
 } as const
 const currentTitle = computed(() => labelConfig[props.parent].title || '')
 const currentButtonLabel = computed(() => labelConfig[props.parent].buttonLabel)
 const currentTitleKeys = computed(() => props.parent === 'education' ?  props.keys.sub : props.keys.title)
 const showInfo = computed(() => currentTitle && props.infoText)
 function addData():void{ 
  const newItem = JSON.parse(JSON.stringify(props.initialData))
  newItem.id = generateRandomId()
  emit('add',newItem)
 }
 function deleteData(itemId:string):void{
   const index = props.data.findIndex((item) => item.id === itemId)
   emit('delete',index)
 }
</script>

<template>
   <section class="generic-list-container flex flex-col gap-2 p-1 w-full">
    <div v-if="showInfo" class="info p-1 flex flex-col gap-2">
      <h1 class="text-xl font-semibold">{{ currentTitle }}</h1>
      <p class="text-md leading-relaxed">{{ infoText }}</p>
    </div>
    <AccordionList
     :items="data"
     :title-key="currentTitleKeys"
     @add="addData"
     @delete="deleteData"
     >
      <template #default="{item}">
        <ContentForm
          :key="item[keys.id]"
          :parent="props.parent"
          v-model:title-model="item[keys.title]"
          v-model:sub-model="item[keys.sub]"
          v-model:city-model="item[keys.city!]"
          v-model:start-date-model="item[keys.startDate!]"
          v-model:end-date-model="item[keys.endDate!]"
          v-model:link-model="item[keys.link!]"
          v-model:employment-types-model="item[keys.employmentTypes!]">
           <DescriptionForm :word-limit="200" v-model:description-model="item[keys.description]"></DescriptionForm>
          </ContentForm>
      </template>
      <template #button-label>{{ currentButtonLabel }}</template>
    </AccordionList>
  </section>
</template>
