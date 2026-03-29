<script setup lang="ts">
  import { ref } from 'vue';
  const props = defineProps<{
    maxSize:number,
    allowedTypes:string[],
    storedPreviewImage:string | null,
    supportedImgPreview:boolean
  }>()
  const emit = defineEmits<{
   (e:'onSubmit',file:File):void
  }>()
  const imageUrl = ref<string | null>(props.storedPreviewImage)
  function onFileChange(event:Event):void {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if(!file) return
  if(!props.allowedTypes.includes(file?.type!)){
    alert('Format file tidak didukung. Hanya JPG dan PNG yang diperbolehkan.')
  }else if(file?.size! > props.maxSize){
    alert('ukuran gambar terlalu besar')
  }else{
    if (imageUrl.value) {
      URL.revokeObjectURL(imageUrl.value)
    }
    imageUrl.value = URL.createObjectURL(file!)
    emit('onSubmit',file!)
  }
  target.value = ''
}
</script>

<template>
  <div class="image-container p-1 flex gap-4 items-center">
    <div class="image-container rounded-md border-2" :class="{'text-gray-300':!supportedImgPreview}">
      <img v-if="imageUrl" :src="imageUrl" class="object-cover w-21 h-21"/>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>
    </div>
    <div v-if="supportedImgPreview" class="uploader-container p-2 flex flex-col gap-2">
      <label for="file" class="border-2 p-2 rounded-md bg-blue-200 cursor-pointer">upload photo</label>
      <input type="file" id="file" accept="image/*" @change="onFileChange"/>
    </div>
    <div v-else class="not-supported-img-info border-1 rounded-md bg-gray-200 text-center p-1 text-red-700 font-bold">
      <h3>This template does not support photos</h3>
    </div>
  </div>
</template>

