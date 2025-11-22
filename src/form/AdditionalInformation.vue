<script setup lang="ts">
 import { useUserStore } from '../store/user.store';
 import DescriptionForm from '../component/DescriptionForm.vue';
 const store = useUserStore()
</script>

<template>
  <div class="summary-container p-2 flex flex-col gap-2">
    <h1 class="title text-xl font-semibold">Additional Information</h1>
    <p class="info">Add anything else you want employers to know.</p>  
    <DescriptionForm v-model:description-model="store.additionalInformation"></DescriptionForm>
  </div>
</template>