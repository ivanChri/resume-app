<script setup lang="ts">
 import { ref,onMounted } from 'vue';
 import Accordion from './Accordion.vue';
 const activeIndex = ref<number | null>(null)
 const props = defineProps<{
   items:any[],
   titleKey:string
 }>()
 const emit = defineEmits<{
   (e:'add'):void,
   (e:'delete',itemId:string):void
 }>()
 function addItem():void{
   emit('add')
   activeIndex.value = props.items.length - 1
 }
 function deleteItem(itemId:string):void{
   emit('delete',itemId)
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
    <Accordion v-for="(item,index) in props.items"
     :key="item.id"
     :title="item[titleKey]"
     :itemId="item.id"
     :itemIndex="index"
     :active="index === activeIndex"
     :showToolbar="true"
     @onToggle="toggle"
     @onDelete="deleteItem"
    >
     <slot :item="item" :index="index"></slot>
    </Accordion>
     <div class="button-container mt-2">
      <button @click="addItem" class="add-btn border p-1 rounded-md text-center ml-3">
        <slot name="button-label">Add Item</slot>
      </button>
    </div>
  </section>
</template>