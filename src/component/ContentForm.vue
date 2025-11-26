<script setup lang="ts">
  import { ref,computed } from 'vue';
  import type { ParentType } from '../utils/component.interface';
  import MonthPicker from './MonthPicker.vue';
  type MonthPickerConfig = {
    disable:boolean,
    methods:(data:string) => void
  }
  const props = defineProps<{
    parent:ParentType
  }>()
  const titleModel = defineModel<string>('titleModel')
  const subModel = defineModel<string>('subModel')
  const startDateModel = defineModel<string>('startDateModel')
  const endDateModel = defineModel<string>('endDateModel')
  const cityModel = defineModel<string>('cityModel')
  const yearModel = defineModel<number>('yearModel')
  const linkModel = defineModel<string>('linkModel')
  const activeIndex = ref<number | null>(null)
  const showMonthPicker = ref<boolean>(false)
  const monthPickerOptions = ref<MonthPickerConfig[]>([
    {
      disable:false,
      methods:(data:string) => {
       if(data){
        startDateModel.value = data
        toggleMonthPicker(0)
       }
      }
    },
    {
     disable:false,
     methods:(data:string) => {
      if(data){
       endDateModel.value = data
       toggleMonthPicker(1)
      }
     }
    }
  ])
  const fieldConfig = {
   experience: { title: 'JobTitle', sub: 'Employer' },
   education: { title: 'SchoolName', sub: 'Degree' },
   portofolio: { title: 'ProjectName', sub: 'ProjectType' },
   course: { title: 'Course', sub: 'Institution' },
   awards: { title: 'Awards Name', sub: 'Institution' },
   volunteering : { title:'Role', sub:'Institution' }
  } as const
  const currentTitle = computed(() => fieldConfig[props.parent]?.title || 'Title')
  const currentSub = computed(() => fieldConfig[props.parent]?.sub || 'Subtitle')
  const labelName = computed(() => {
    return props.parent === 'awards' ? 'Recived Year' : 'Start & End Date'
  })
  const statusLabel = computed(() => {
    return props.parent === 'experience' ? 'Currently Working Here' : 'Currently Study Here'
  })
  const hideInput = computed(() => {
   return props.parent !== 'course' && 
    props.parent !== 'awards' && props.parent !== 'portofolio'
  })
  function toggleMonthPicker(index:number):void{
    activeIndex.value = activeIndex.value === index ? null : index
    showMonthPicker.value = activeIndex.value === index
  }
  function updateEndDateModel(event:Event):void{
   const target = event.target as HTMLInputElement
   endDateModel.value = target.checked ? 'Present' : ''
   monthPickerOptions.value[1].disable = target.checked 
  }
</script>

<template>
  <div class="accordion-content grid grid-cols-2 gap-2">
    <div class="flex flex-col p-1 gap-3">
      <label for="title">{{ currentTitle }}</label>
      <input type="text" v-model="titleModel" id="title" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
    </div>
    <div class="flex flex-col p-1 gap-3">
      <label for="sub">{{ currentSub }}</label>
      <input type="text" v-model="subModel" id="sub" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
    </div>
    <div class="flex flex-col p-1 gap-2 relative">
      <span>{{ labelName }}</span>
      <div v-if="parent !== 'awards'" class="flex flex-col gap-2">
       <div class="option-container w-full flex gap-3 p-1 text-center">
        <button @click="toggleMonthPicker(0)" class="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none cursor-pointer transition-all duration-200" :class="{'ring-2 ring-blue-500 border-blue-500' : activeIndex == 0}">
          <span class="font-thin text-md">{{ startDateModel || 'MM/YYYY' }}</span>
        </button>
        <button @click="toggleMonthPicker(1)" class="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none cursor-pointer transition-all duration-200" :class="{'ring-2 ring-blue-500 border-blue-500' : activeIndex == 1}">
          <span class="font-thin text-md">{{ endDateModel || 'MM/YYYY' }}</span>
        </button>
       </div>
       <div v-if="showMonthPicker" class= "z-10 absolute mt-15 p-1 max-w-sm w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-70 overflow-auto">
         <MonthPicker :disabled-button="monthPickerOptions[activeIndex!].disable" @on-update="monthPickerOptions[activeIndex!].methods"></MonthPicker>
       </div>
       <div v-if="hideInput" class="status-button-container">
         <label class="relative flex justify-between items-center group p-1">
           {{ statusLabel }}
          <input type="checkbox" @change="updateEndDateModel" class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
          <span class="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
        </label>
       </div>
      </div>
      <div v-else>
        <input type="number" v-model="yearModel" placeholder="YYYY" min="1900" max="2099" class="p-2 w-35 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
      </div>
    </div>
    <div class="dynamic-input-container">
     <div v-if="hideInput" class="flex flex-col p-1 gap-2">
       <label for="city">City</label>
       <input type="text" v-model="cityModel" id="city" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
     </div>
      <div v-else-if="parent === 'portofolio'" class="flex flex-col p-1 gap-2">
       <label for="link">Link</label>
       <input type="url" v-model="linkModel" id="link" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
     </div>
    </div>
    <div class="descriptionEditor-container col-span-2">
      <label for="description">Description</label>
      <slot></slot>
    </div>
  </div>
</template>