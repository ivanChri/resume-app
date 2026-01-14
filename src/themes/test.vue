<script setup lang="ts">
 import type { themesProps } from '../utils/component.interface';
 const props = defineProps<{propsConfig:themesProps,fonts:string,fontsSize:string}>()
</script>

<template>
 <div :class="[fontsSize]" :style="{'font-family':fonts}">
  <div class="header flex flex-col gap-2 p-1">
    <h1>{{ propsConfig.header.value.jobTitle }}</h1>
    <h1>{{ propsConfig.header.value.firstName }} {{ propsConfig.header.value.lastName }}</h1>
  </div>
  <div v-if="propsConfig.addtionalDetails.value.length" class="details p-1">
    <h2>Details</h2>
    <div v-for="(data,index) in propsConfig.addtionalDetails.value" :key="index">
      <span>{{ data.name }}</span> -- <span>{{ data.value }}</span>
    </div>
    <div v-if="propsConfig.summary.length" class="profesional-container">
      <h3>profesional summary</h3>
      <p v-html="propsConfig.summary"></p>
    </div>
  </div>
 </div>
</template>