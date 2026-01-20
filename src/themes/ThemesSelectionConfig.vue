<script setup lang="ts">
  const data = ['themes-1','themes-2','themes-3','themes-4']
</script>

<template>
  <div class="themes-selection-container flex flex-wrap gap-2">
    <div v-for="(item,index) in data" class="p-1 border border-1 rounded-md" :key="index">
       {{ item }}
    </div>
  </div>
</template>