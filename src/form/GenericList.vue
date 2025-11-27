<script setup lang="ts" generic="T extends {id:string}">
 import { computed } from 'vue';
 import { generateRandomId } from '../utils/utility';
 import type { ParentType } from '../utils/component.interface';
 import AccordionList from '../component/AccordionList.vue';
 import ContentForm from '../component/ContentForm.vue';
 import DescriptionForm from '../component/DescriptionForm.vue';
 const props = defineProps<{
  parent:ParentType,
  data:T[],
  initialData:T
 }>()
 const labelConfig = {
   experience:'Add Experience',
   education:'Add Education',
   portofolio:'Add Portofolio',
   course:'Add Course',
   awards:'Add Awards',
   volunteering:'Add Volunteering'
 } as const
 const currentButtonLabel = computed(() => labelConfig[props.parent])
 const keys = Object.keys(props.initialData)
 const [id,title,sub,startDate,endDate,city,description] = keys
 function addData():void{
  const newItem = JSON.parse(JSON.stringify(props.initialData))
  newItem.id = generateRandomId()
  props.data.push(newItem)
 }
 function deleteData(itemId:string):void{
   const index = props.data.findIndex((item) => item.id === itemId)
   if(index !== -1) props.data.splice(index,1)
  }
</script>

<template>
   <section class="generic-list-container p-1 w-full">
    <AccordionList
     :items="data"
     :title-key="title"
     @add="addData"
     @delete="deleteData"
     >
      <template #default="{item}">
        <ContentForm
          :key="item[id]"
          :parent="parent"
          v-model:title-model="item[title]"
          v-model:sub-model="item[sub]"
          v-model:start-date-model="item[startDate]"
          v-model:end-date-model="item[endDate]"
          v-model:city-model="item[city]">
          <DescriptionForm v-model:description-model="item[description]"></DescriptionForm>
        </ContentForm>
      </template>
      <template #button-label>{{ currentButtonLabel }}</template>
    </AccordionList>
  </section>
</template>