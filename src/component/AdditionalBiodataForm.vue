<script setup lang="ts">
  import { ref,computed } from 'vue';
  const active = ref<boolean>(false)
  const buttonLabel = computed(() => {
    return active.value ? 'Hide additional details' : 'Add more details'
  })
  const placeOfBirthModel = defineModel('placeOfBirthModel')
  const dateOfBirthModel = defineModel('dateOfBirthModel')
  const postalCodeModel = defineModel('postalCodeModal')
  const drivingLicenseModel = defineModel('drivingLicenseModel')
  const nationalityModel = defineModel('nationalityModel')
  function toogleActive():void{
    active.value = !active.value
  }
</script>

<template>
  <section class="addtional-biodata-container w-full">
   <Transition name="additionalForm">
   <div v-if="active" class="addtional-biodata-form grid grid-cols-1 md:grid-cols-2 gap-y-1">
    <div class="flex flex-col p-1 gap-2">
      <label for="dateOfBirth">Date Of Birth</label>
      <input type="date" v-model="dateOfBirthModel" id="dateOfBirth" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
    </div>
    <div class="flex flex-col p-1 gap-2">
      <label for="placeOfBirth">Place Of Birth</label>
      <input type="text" v-model="placeOfBirthModel" id="placeOfBirth" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
    </div>
    <div class="flex flex-col p-1 gap-2">
      <label for="postal-code">Postal Code</label>
<<<<<<< HEAD
      <input type="text" v-model="postalCodeModel" id="postal-code" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
=======
      <input type="number" v-model="postalCodeModel" id="postal-code" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
    </div>
    <div class="flex flex-col p-1 gap-2">
      <label for="driving-license">Driving License</label>
      <input type="text" v-model="drivingLicenseModel" id="driving-license" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
    </div>
     <div class="flex flex-col p-1 gap-2">
      <label for="nationality">Nationality</label>
      <input type="text" v-model="nationalityModel" id="nationality" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
    </div>
   </div>
   </Transition>
   <div class="button-container max-w-md">
      <button @click="toogleActive" class="w-full flex gap-3 items-center p-2 text-left font-medium cursor-pointer">
        <span>{{ buttonLabel }}</span>
        <svg 
          class="w-5 h-5 transition-transform duration-300" 
          :class="{ 'rotate-180': active }"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
   </div>
  </section>
</template>

<style scoped>
.additionalForm-enter-active,
.additionalForm-leave-active {
  transition: all 0.4s ease-out;
  overflow: hidden;
}

.additionalForm-enter-from,
.additionalForm-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.additionalForm-enter-to,
.additionalForm-leave-from {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}
</style>