<script setup lang="ts" generic="T extends Object">
 import { onMounted,computed } from 'vue';
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
 const [,title,sub,startDate,endDate,city,description] = Object.keys(props.initialData)
 function addData():void{
   props.data.push(props.initialData)
 }
 onMounted(() => {
  console.log(Object.keys(props.initialData))
 })
</script>

<template>
   <section class="work-experience-container p-1 w-full">
    <AccordionList
     :items="data"
     :title-key="title"
     @add="addData"
     >
      <template #default="{item}">
        <ContentForm
          :parent="parent"
          v-model:title-model="item[title]"
          v-model:sub-model="item.employer[sub]"
          v-model:start-date-model="item[startDate]"
          v-model:end-date-model="item[endDate]"
          v-model:city-model="item[city]">
          <DescriptionForm v-model:description-model="item[description]"></DescriptionForm>
        </ContentForm>
      </template>
      <template #button-label>{{ currentButtonLabel }}</template>
    </AccordionList>
  </section>
  <button @click="() => console.log(data)">mmk</button>
</template>