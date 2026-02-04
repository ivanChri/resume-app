<script setup lang="ts">
 import { ref,onMounted,useTemplateRef,defineAsyncComponent } from 'vue';
 import Accordion from './Accordion.vue';
 interface items {
  id: string,
  [key: string]: any
}
 const props = defineProps<{
   items:items[]
   titleKey:string
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
   alertRef.value?.open()
   currentId.value = itemId
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
     :showToolbar="true"
     @onToggle="toggle"
     @openAlert="openAlert"
    >
     <slot :item="item" :index="index"></slot>
    </Accordion>
     <div class="button-container p-1 mt-2">
      <button @click="addItem" class="add-btn border p-1 rounded-md text-center ml-3">
        <slot name="buttonName"></slot>
      </button>
    </div>
  </section>
</template>