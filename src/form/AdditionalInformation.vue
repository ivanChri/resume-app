<script setup lang="ts">
 import { defineAsyncComponent } from 'vue';
 import { useUserStore } from '../store/user.store';
 import SkeletonLoading from '../component/SkeletonLoading.vue';
 const store = useUserStore()
 const asyncEditor = defineAsyncComponent(() => import('../component/TipTapEditor.vue'))
</script>

<template>
  <div class="summary-container p-2 flex flex-col gap-2">
    <h1 class="title text-xl font-semibold">Additional Information</h1>
    <p class="info text-md leading-relaxed">Add anything else you want employers to know.</p> 
    <Suspense>
      <template #default>
        <asyncEditor v-model="store.additionalInformation" :word-limit="400"></asyncEditor>
      </template>
      <template #fallback>
        <SkeletonLoading></SkeletonLoading>
      </template>
    </Suspense>
  </div>
</template>