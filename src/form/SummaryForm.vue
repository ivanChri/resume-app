<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';
  import { useUserStore } from '../store/user.store';
  import SkeletonLoading from '../component/SkeletonLoading.vue';
  const store = useUserStore()
  const asyncEditor = defineAsyncComponent(() => import('../component/TipTapEditor.vue'))
</script>

<template>
  <div class="summary-container p-2 flex flex-col gap-2">
   <h1 class="title text-xl font-semibold">Profesional Summary</h1>
   <p class="info text-md leading-relaxed">Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.</p>  
   <Suspense>
     <template #default>
       <asyncEditor v-model="store.summary" :word-limit="400"></asyncEditor>
     </template>
     <template #fallback>
       <SkeletonLoading></SkeletonLoading>
     </template>
   </Suspense>
  </div>
</template>