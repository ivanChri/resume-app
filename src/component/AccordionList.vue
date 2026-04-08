<script setup lang="ts">
 import { ref,onMounted,useTemplateRef,defineAsyncComponent } from 'vue';
 import Accordion from './Accordion.vue';
 interface items {
  id: string,
  isRequired?:boolean
  [key: string]: any
}
 const props = defineProps<{
   items:items[]
   titleKey:keyof items
 }>()
 const emit = defineEmits<{
   (e:'add'):void
   (e:'delete',itemId:string):void
 }>()
 const asyncAlert = defineAsyncComponent(() => import('./Alert.vue'))
 const activeIndex = ref<number | null>(null)
 const currentId = ref<string | null>(null)
 const alertRef = useTemplateRef('alertRef')
 function addItem():void{
   emit('add')
   activeIndex.value = props.items.length - 1
 }
 function openAlert(itemId:string):void{
   currentId.value = itemId
   if(alertRef.value) alertRef.value.open()
 }
 function confirmDelete():void{
  if(currentId.value) emit('delete',currentId.value)
 }
 function toggle (index:number):void {
   activeIndex.value = activeIndex.value === index ? null : index
 }
 onMounted(() => {
   if(!props.items.length) addItem()
 })
</script>

<template>
  <section class="accrodion-list w-full flex flex-col gap-1">
    <asyncAlert ref="alertRef" @confirm="confirmDelete" @closeEvent="() => currentId = null"></asyncAlert>
    <Accordion v-for="(item,index) in props.items"
     :key="item.id"
     :title="item[titleKey]"
     :itemId="item.id"
     :itemIndex="index"
     :active="index === activeIndex"
     :showToolbar="!item['isRequired']"
     @onToggle="toggle"
     @openAlert="openAlert">
      <slot :item="item" :index="index"></slot>
    </Accordion>
     <div v-if="$slots.buttonName" class="footer p-1 mt-2">
      <button @click="addItem" class="add-btn rounded-md p-2 border-2 cursor-pointer text-center text-white bg-blue-600 ml-2">
        <slot name="buttonName"></slot>
      </button>
    </div>
  </section>
</template>