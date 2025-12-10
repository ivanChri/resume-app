<script setup lang="ts" generic="T extends {id:string}">
 import { computed } from 'vue';
 import { generateRandomId } from '../utils/utility';
 import type { genericData } from '../utils/component.interface';
 import AccordionList from '../component/AccordionList.vue';
 import ContentForm from '../component/ContentForm.vue';
 import DescriptionForm from '../component/DescriptionForm.vue';
 const props = defineProps<genericData<T>>()
 const labelConfig = {
   experience:'Add Experience',
   education:'Add Education',
   portofolio:'Add Portofolio',
   course:'Add Course',
   awards:'Add Awards',
   volunteering:'Add Volunteering'
 } as const
 const currentButtonLabel = computed(() => labelConfig[props.parent])
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
   <section class="generic-list-container flex flex-col gap-2 p-1 w-full">
    <div class="info p-1">
      <p>{{ infoText }}</p>
    </div>
    <AccordionList
     :items="data"
     :title-key="keys.title"
     :sub-key="keys.sub"
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
          v-model:year-model="item[keys.year!]">
           <DescriptionForm :word-limit="300" v-model:description-model="item[keys.description]"></DescriptionForm>
          </ContentForm>
      </template>
      <template #button-label>{{ currentButtonLabel }}</template>
    </AccordionList>
  </section>
</template>
