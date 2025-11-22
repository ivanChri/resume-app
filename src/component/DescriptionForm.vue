<script setup lang="ts">
  import { ref,onMounted,useTemplateRef } from 'vue';
  const descriptionEditor = useTemplateRef<HTMLDivElement | null>('descriptionEditor')
  const descriptionModel = defineModel<string>('descriptionModel')
  const descriptionWordLength = ref<number>(0)
  const lastValidValue = ref<string>('')
  const formats = ref({
    bold:false,
    italic:false,
    underline:false,
    orderedList: false,
    unorderedList: false
  })
  let isInternalUpdate = false
  function formatText (command:string):void{
   if (!descriptionEditor.value) return
   descriptionEditor.value.focus()
   document.execCommand(command, false)
   updateFormatStates()
  }
 function updateFormatStates():void {
  if (!descriptionEditor.value) return
  formats.value.bold = document.queryCommandState('bold')
  formats.value.italic = document.queryCommandState('italic')
  formats.value.underline = document.queryCommandState('underline')
  formats.value.orderedList = document.queryCommandState('insertOrderedList')
  formats.value.unorderedList = document.queryCommandState('insertUnorderedList')
 }
 function onUpdate(event:Event):void{
  if (isInternalUpdate) return
  const target = event.target as HTMLDivElement
  const text = target.innerText.trim();
  if(text.length <= 400){
    descriptionWordLength.value = text.length
    descriptionModel.value = target.innerHTML
    lastValidValue.value = target.innerHTML
  }else{
    isInternalUpdate = true
    target.innerHTML = lastValidValue.value
    descriptionWordLength.value = 300
    descriptionModel.value = lastValidValue.value
    placeCaretAtEnd(target)
    isInternalUpdate = false
  }
 }
 function placeCaretAtEnd(el: HTMLElement) {
  el.focus();
  const range = document.createRange()
  const sel = window.getSelection()
  range.selectNodeContents(el)
  range.collapse(false)
  sel?.removeAllRanges()
  sel?.addRange(range)
}
 onMounted(() => {
   if(descriptionModel.value){
     descriptionEditor.value!.innerHTML = descriptionModel.value
     descriptionWordLength.value = descriptionEditor.value!.innerText.trim().length
   }
 })
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="toolbar flex justify-between p-1 w-40">
      <button @click="formatText('bold')" :class="{ active: formats.bold }">
        <b>B</b>
      </button>
      <button @click="formatText('italic')" :class="{ active: formats.italic }">
        <i>I</i>
      </button>
      <button @click="formatText('underline')" :class="{ active: formats.underline }">
        <u>U</u>
      </button>
      <button @click="formatText('insertUnorderedList')" :class="{ active: formats.unorderedList }">
        <span>.List</span>
      </button>
      <button @click="formatText('insertOrderedList')" :class="{ active: formats.orderedList }">
        <span>1. List</span>
      </button>
    </div>
    <div ref="descriptionEditor" @input="onUpdate" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 h-48" id="description" contenteditable="true"></div>
    <div class="wordLength  p-1 max-w-xs">
       <span>{{ descriptionWordLength }} / 400</span>
    </div>
  </div>
</template>

<style scoped>
 .toolbar button.active {
  background-color: #d0e3ff;
  border-color: #4a90e2;
}
</style>