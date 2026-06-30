<script setup lang="ts">
import type { themesLayoutStyle } from '../utils/types/themes.interface';
 defineProps<{
  layout:themesLayoutStyle,
  supportedPhotos:boolean,
  data:string[]
 }>()
</script>

<template>
 <div :class="layout.base" class="border-gray-500 bg-gray-50">
  <header class="border-1 border-red-500 p-1 rounded-md">
    <div :class="layout.header">
      <div v-if="supportedPhotos" class="p-1">
       <span>Photo Profile</span>
     </div>
      <div class="main-title p-1 w-full flex flex-col gap-1">
        <span>JobTitle</span>
        <span>FullName</span>
      </div>
      <div class="contact p-1 w-full flex flex-col gap-1">
        <span>Contact</span>
        <span>Social Media</span>
      </div>
    </div>
    <div class="mt-1 p-1">
      <span>Additional Details</span>
    </div>
  </header>
  <div :class="layout.main" class="mt-1">
    <div class="p-1 border-1 rounded-md flex flex-col gap-1 border-red-500">
      <span>Profile</span>
      <span>Additional Info</span>
    </div>
    <div class="border-1 border-gray-500 p-1 rounded-md flex flex-col gap-1">
      <span v-for="(item,index) in data" :key="index">{{ item }}</span>
    </div>
  </div>
</div>
</template>

<style scoped>
 span {
  padding: 1px;
  border:.5px solid gray;
  border-radius: 5px;
  display: inline-block;
  width: 100%;
  background-color: #F3F4F6;
  color:#374151;
 }
</style>