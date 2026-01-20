<script setup lang="ts">
 import type { themesProps } from '../utils/component.interface';
 const props = defineProps<{
  propsData:themesProps,
  fonts:string,
  fontsSize:string,
  lineHeight:string
  }>()
</script>

<template>
 <div :class="[fontsSize,lineHeight,'p-1']" :style="{'font-family':fonts}">
  <div class="header flex flex-col gap-2 p-1">
    <h1>{{ propsData.header.value.jobTitle }}</h1>
    <h1>{{ propsData.header.value.firstName }} {{ propsData.header.value.lastName }}</h1>
  </div>
  <div v-if="propsData.addtionalDetails.value.length" class="details p-1">
    <h2>Details</h2>
    <div v-for="(data,index) in propsData.addtionalDetails.value" :key="index">
      <span>{{ data.name }}</span> -- <span>{{ data.value }}</span>
    </div>
  </div>
  <div v-if="propsData.summary.length" class="profesional-container">
    <h3>profesional summary</h3>
    <p v-html="propsData.summary"></p>
  </div>
 </div>
</template>