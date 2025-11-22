<script setup lang="ts">
  import { ref } from 'vue';
  import avatar from '../assets/avatar.svg';
  const props = defineProps<{
    maxSize:number,
    allowedTypes:string[],
    storedPreviewImage:string | null
  }>()
  const emit = defineEmits<{
   (e:'onSubmit',file:File):void
  }>()
  const imageUrl = ref<string | null>(props.storedPreviewImage)
  function onFileChange(event:Event):void {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if(!props.allowedTypes.includes(file?.type!)){
    alert('Format file tidak didukung. Hanya JPG dan PNG yang diperbolehkan.')
    return
  }else if(file?.size! > props.maxSize){
    alert('ukuran gambar terlalu besar')
    return
  }else{
    imageUrl.value = URL.createObjectURL(file!)
    emit('onSubmit',file!)
  }
}
</script>

<template>
  <div class="image-container p-1 flex gap-4 items-center">
    <div class="image-container">
      <img v-if="imageUrl" :src="imageUrl" class="object-cover w-21 h-21 rounded-md border-2 border-slate-700"/>
      <img v-else :src="avatar" class="object-cover w-21 h-21 rounded-md border-2 border border-slate-500"/>
    </div>
    <div class="uploader-container p-2 flex flex-col gap-2">
      <label for="file" class="border-2 p-2 rounded-md bg-blue-200 cursor-pointer">upload photo</label>
      <input type="file" id="file" accept="image/*" @change="onFileChange"/>
    </div>
  </div>
</template>

