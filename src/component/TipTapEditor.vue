<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
const props = defineProps<{
  modelValue:string,
  wordLimit:number
}>()
const emit = defineEmits(['update:modelValue'])
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      link:{
      openOnClick:false,
      linkOnPaste:true,
      defaultProtocol:'https',
      HTMLAttributes:{
        target:'_blank',
        rel:'noopener noreferrer',
        class: 'text-blue-600 underline cursor-pointer'
      }
     }
    }),
    CharacterCount.configure({
      limit:props.wordLimit
    }),
  ],
  onUpdate: ({ editor }) => {
    const content = editor.isEmpty ? '' : editor.getHTML()
    emit('update:modelValue', content)
  },
  editorProps: {
    attributes: {
      class: 'focus:outline-none',
    },
  },
})
</script>

<template>
  <div class="w-full border-2 mt-3 border-gray-200 rounded-lg overflow-hidden bg-white">
    <div v-if="editor" class="flex flex-wrap gap-2 p-2 border-b border-gray-200 bg-gray-50">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="['px-3 py-1 border rounded text-sm font-bold cursor-pointer', 
        editor.isActive('bold') ? 'bg-black text-white' : 'bg-white hover:bg-gray-100']">
          B
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="['px-3 py-1 border rounded text-sm italic cursor-pointer',
        editor.isActive('italic') ? 'bg-black text-white' : 'bg-white']">
         I
      </button>
      <button
        @click="editor.chain().focus().toggleUnderline().run()"
        :class="['px-3 py-1 border rounded text-sm underline cursor-pointer',
        editor.isActive('underline') ? 'bg-black text-white' : 'bg-white']">
         U
      </button>
      <div class="w-[1px] h-6 bg-gray-300 mx-1"></div> 
       <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="['px-3 py-1 border rounded text-sm cursor-pointer',
        editor.isActive('bulletList') ? 'bg-black text-white' : 'bg-white']">
         • List
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="['px-3 py-1 border rounded text-sm cursor-pointer', 
        editor.isActive('orderedList') ? 'bg-black text-white' : 'bg-white']">
         1. List
      </button>
    </div>
    <editor-content 
      :editor="editor" 
      class="p-4 min-h-[200px] prose prose-slate max-w-none focus:outline-none"
    />
    <div v-if="editor" class="p-2 border-t border-gray-200 text-sm text-gray-500 flex justify-end gap-4">
      <span :class="{'text-red-500 font-bold': editor.storage.characterCount.characters() >= wordLimit}">
        {{ editor.storage.characterCount.characters() }} / {{ wordLimit }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.tiptap {
  min-height: 200px;
  outline: none;
}
:deep(.ProseMirror a) {
  color: #2563eb;
  text-decoration: underline;
  cursor: pointer;
}
</style>