<script setup lang="ts">
  import { useUserStore } from '../store/user.store';
  import DescriptionForm from '../component/DescriptionForm.vue';
  const store = useUserStore()
</script>

<template>
  <div class="summary-container p-2 flex flex-col gap-2">
   <h1 class="title text-xl font-semibold">Profesional Summary</h1>
   <p class="info">Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.</p>  
   <DescriptionForm :word-limit="400" v-model:description-model="store.summary"></DescriptionForm>
  </div>
</template>