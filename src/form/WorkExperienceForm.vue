<script setup lang="ts">
  import { useUserStore } from '../store/user.store';
  import AccordionList from '../component/AccordionList.vue';
  import ContentForm from '../component/ContentForm.vue';
  import DescriptionForm from '../component/DescriptionForm.vue';
  import { generateRandomId } from '../utils/utility';
  const store = useUserStore()
  function addExperience():void{
    store.experience.push({
      id:generateRandomId(),
      jobTitle:'',
      employer:'',
      startDate:'',
      endDate:'',
      city:'',
      description:''
    })
  }
  function deleteExperience(itemId:string):void{
   const index = store.experience.findIndex((item) => item.id === itemId)
   if(index !== -1) store.experience.splice(index,1)
  }
</script>

<template>
  <section class="work-experience-container p-1 w-full">
    <AccordionList
     :items="store.experience"
     title-key="jobTitle"
     @add="addExperience"
     @delete="deleteExperience"
     >
      <template #default="{item}">
        <ContentForm
         parent="experience"
         v-model:title-model="item.jobTitle"
         v-model:sub-model="item.employer"
         v-model:start-date-model="item.startDate"
         v-model:end-date-model="item.endDate"
         v-model:city-model="item.city">
          <DescriptionForm v-model:description-model="item.description"></DescriptionForm>
        </ContentForm>
      </template>
      <template #button-label>Add Experience</template>
    </AccordionList>
  </section>
</template>

<style scoped>
.accordion-list-move,
.accordion-item-enter-active,
.accordion-item-leave-active {
  transition: all 0.5s ease;
}
.accordion-item-enter-from,
.accordion-item-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.accordion-item-enter-to,
.accordion-item-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>