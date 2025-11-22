<script setup lang="ts">
  import { reactive,watch,onMounted } from 'vue';
  import { useUserStore } from '../store/user.store';
  import ImageUploader from '../component/ImageUploader.vue';
  const store = useUserStore()
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
  <section class="biodata-form w-full grid grid-cols-2">
    <div class="flex flex-col p-1 gap-2">
      <label for="jobTitle">JobTitle</label>
      <input type="text" v-model="store.biodata.jobTitle" id="jobTitle" :class="{'border-2 border-orange-400 focus:outline-red-500':!store.biodata.jobTitle}" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
    </div>
    <ImageUploader 
     :maxSize="1 * 1024 * 1024" 
     :allowedTypes="['image/jpeg', 'image/png']"
     :storedPreviewImage="store.biodata.photoPreview || null"
     @onSubmit="setUserPhotoPreview"></ImageUploader>
    <div class="flex flex-col p-1 gap-2">
      <label for="firstName">FirstName</label>
      <input type="text" v-model="store.biodata.firstName" id="firstName" :class="{'border-2 border-orange-400 focus:outline-red-500':!store.biodata.firstName}" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
    </div>
    <div class="flex flex-col p-1 gap-2">
      <label for="lastName">LastName</label>
      <input type="text" v-model="store.biodata.lastName" id="lastName" :class="{'border-2 border-orange-400 focus:outline-red-500':!store.biodata.lastName}" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
    </div>
    <div class="flex flex-col p-1 gap-2">
      <label for="email">Email</label>
      <input type="email" v-model="tempEmail.email" id="email" :class="{'border-2 border-orange-400 focus:outline-red-500':!store.biodata.email}" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
      <span v-if="!tempEmail.valid" class="text-md p-1 font-semibold font-danger-200">{{ tempEmail.errorMessage }}</span>
    </div>
    <div class="flex flex-col p-1 gap-2">
      <label for="phone">Phone</label>
      <input type="tel" v-model="tempPhoneNumber.phoneNumber" id="phone" :class="{'border-2 border-orange-400 focus:outline-red-500':!store.biodata.phone}" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
      <span v-if="!tempPhoneNumber.valid" class="text-md p-1 font-semibold font-danger-200">{{ tempPhoneNumber.errorMessage }}</span>
    </div>
    <div class="flex flex-col p-1 gap-2 col-span-2">
      <label for="address">Address</label>
      <input type="text" v-model="store.biodata.address" id="address" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
    </div>
    <div class="flex flex-col p-1 gap-2">
      <label for="city">City/State</label>
      <input type="text" v-model="store.biodata.city" id="city" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
    </div>
    <div class="flex flex-col p-1 gap-2">
      <label for="country">Country</label>
      <input type="text" v-model="store.biodata.country" id="country" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
    </div>
    <div class="flex flex-col p-1 gap-2">
      <label for="dateOfBirth">Date Of Birth</label>
      <input type="date" v-model="store.biodata.dateOfBirth" id="dateOfBirth" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
    </div>
    <div class="flex flex-col p-1 gap-2">
      <label for="placeOfBirth">Place Of Birth</label>
      <input type="text" v-model="store.biodata.placeOfBirth" id="placeOfBirth" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
    </div>
    <div class="flex flex-col p-1 gap-2">
      <label for="postal-code">Postal Code</label>
      <input type="number" v-model="store.biodata.postalCode" id="postal-code" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500" />
    </div>
  </section>
</template>