<script setup lang="ts">
  import { reactive,watch,onMounted } from 'vue';
  import { useUserStore } from '../store/user.store';
  import { useThemesStore } from '../store/themes.store';
  import ImageUploader from '../component/ImageUploader.vue';
  import AddtionalBiodata from '../component/AdditionalBiodataForm.vue';
  const store = useUserStore()
  const themesStore = useThemesStore()
  const tempEmail = reactive<{email:string,errorMessage:string,valid:boolean | null}>({
    email:'',
    errorMessage:'',
    valid:null
  })
  const tempPhoneNumber = reactive<{phoneNumber:string,errorMessage:string,valid:boolean | null}>({
    phoneNumber:'',
    errorMessage:'',
    valid:null
  })
  function setUserPhotoPreview(file:File):void{
    store.setPhotoPreview(file)
  }
  function validateEmail(email:string):void{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      tempEmail.valid = true
      store.biodata.email = email
      return
    }else{
      tempEmail.valid = false
      tempEmail.errorMessage = 'Invalid Email Address'
      store.biodata.email = ''
      return
    }
  }
  function validatePhoneNumber(phoneNumber:string):void{
    const cleaned = phoneNumber.replace(/[\s\-().]/g, '')
    if (!/^\+?\d+$/.test(cleaned)){
      store.biodata.phone = ''
      tempPhoneNumber.valid = false
      tempPhoneNumber.errorMessage = 'Nomor hanya boleh berisi angka'
      return
    }
    const digitCount = cleaned.startsWith('+') ? cleaned.length - 1 : cleaned.length
    if(digitCount < 7){
      store.biodata.phone = ''
      tempPhoneNumber.valid = false
      tempPhoneNumber.errorMessage = 'Nomor terlalu pendek (min. 7 digit)'
      return
    }
    if(digitCount > 15){
      store.biodata.phone = ''
      tempPhoneNumber.valid = false
      tempPhoneNumber.errorMessage = 'Nomor terlalu panjang (maks. 15 digit)'
      return
    }
    tempPhoneNumber.valid = true
    store.biodata.phone = phoneNumber
  }
  watch(tempEmail,(newValue) => {
    validateEmail(newValue.email)
  })
  watch(tempPhoneNumber,(newValue) => {
    validatePhoneNumber(newValue.phoneNumber)
  })
  onMounted(() => {
    if(store.biodata.email) tempEmail.email = store.biodata.email
    if(store.biodata.phone) tempPhoneNumber.phoneNumber = store.biodata.phone
  })
</script>

<template>
  <section class="biodata p-1 md:p-3">
    <h1 class="p-1 text-xl my-1 font-semibold">Personal Details</h1>
    <div class="biodata-form w-full grid grid-cols-1 md:grid-cols-2 gap-y-1">
      <div class="col-span-1 md:col-span-1">
        <ImageUploader 
          :maxSize="1 * 1024 * 1024" 
          :allowedTypes="['image/jpeg', 'image/png']"
          :storedPreviewImage="store.biodata.photoPreview || null"
          :supportedImgPreview="themesStore.themes?.supportedUserPhoto!"
          @onSubmit="setUserPhotoPreview"
        />
      </div>
      <div class="flex flex-col p-1 gap-2">
        <label for="jobTitle" class="font-medium">JobTitle</label>
        <input type="text" v-model="store.biodata.jobTitle" id="jobTitle" :class="{'border-2 border-orange-400 focus:outline-red-500':!store.biodata.jobTitle}" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 w-full"/>
      </div>
      <div class="flex flex-col p-1 gap-2">
        <label for="firstName" class="font-medium">FirstName</label>
        <input type="text" v-model="store.biodata.firstName" id="firstName" :class="{'border-2 border-orange-400 focus:outline-red-500':!store.biodata.firstName}" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 w-full" />
      </div>
      <div class="flex flex-col p-1 gap-2">
        <label for="lastName" class="font-medium">LastName</label>
        <input type="text" v-model="store.biodata.lastName" id="lastName" :class="{'border-2 border-orange-400 focus:outline-red-500':!store.biodata.lastName}" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 w-full" />
      </div>
      <div class="flex flex-col p-1 gap-2">
        <label for="email" class="font-medium">Email</label>
        <input type="email" v-model="tempEmail.email" id="email" :class="{'border-2 border-orange-400 focus:outline-red-500':!store.biodata.email}" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 w-full" />
        <span v-if="!tempEmail.valid" class="text-sm p-1 font-semibold text-red-600">{{ tempEmail.errorMessage }}</span>
      </div>
      <div class="flex flex-col p-1 gap-2">
        <label for="phone" class="font-medium">Phone</label>
        <input type="tel" v-model="tempPhoneNumber.phoneNumber" id="phone" :class="{'border-2 border-orange-400 focus:outline-red-500':!store.biodata.phone}" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 w-full" />
        <span v-if="!tempPhoneNumber.valid" class="text-sm p-1 font-semibold text-red-600">{{ tempPhoneNumber.errorMessage }}</span>
      </div>
      <div class="flex flex-col p-1 gap-2 col-span-1 md:col-span-2">
        <label for="address" class="font-medium">Address</label>
        <input type="text" v-model="store.biodata.address" id="address" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 w-full" />
      </div>
      <div class="flex flex-col p-1 gap-2">
        <label for="city" class="font-medium">City/State</label>
        <input type="text" v-model="store.biodata.city" id="city" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 w-full" />
      </div>
      <div class="flex flex-col p-1 gap-2">
        <label for="country" class="font-medium">Country</label>
        <input type="text" v-model="store.biodata.country" id="country" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 w-full" />
      </div>
    </div>
  <AddtionalBiodata 
   v-model:dateOfBirthModel="store.biodata.dateOfBirth"
   v-model:placeOfBirthModel="store.biodata.placeOfBirth"
   v-model:postalCodeModal="store.biodata.postalCode"
   v-model:drivingLicenseModel="store.biodata.drivingLicense"
   v-model:nationalityModel="store.biodata.nationality"></AddtionalBiodata>
  </section>
</template>