<script setup lang="ts">
  import { ref,computed } from 'vue';
  import type { ParentType } from '../utils/component.interface';
  import type { employmentTypes } from '../utils/form.interface';
<<<<<<< HEAD
  import { fieldConfig } from '../utils/fieldConfig';
=======
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
  import MonthPicker from './MonthPicker.vue';
  import Dropdow from './Dropdow.vue';
  type MonthPickerConfig = {
    disable:boolean,
    methods:(data:string) => void
  }
  const props = defineProps<{
    parent:ParentType
  }>()
  const types:employmentTypes[] = ['Full-time','Part-time','Internship','Contract','Freelance']
  const titleModel = defineModel<string>('titleModel')
  const subModel = defineModel<string>('subModel')
  const startDateModel = defineModel<string | null>('startDateModel',{default:null})
  const endDateModel = defineModel<string | null>('endDateModel',{default:null})
  const cityModel = defineModel<string | null>('cityModel',{default:null})
  const linkModel = defineModel<string | null>('linkModel',{default:null})
  const employmentTypesModel = defineModel<string | null>('employmentTypesModel',{default:null})
  const activeIndex = ref<number | null>(null)
  const showMonthPicker = ref<boolean>(false)
<<<<<<< HEAD
  
=======
  const fieldConfig = {
   experience: {
    title:'JobTitle',
    sub:'Employer',
    showCity:true,
    showLink:false,
    showEmploymentType:true,
    labelName:'Start & End Date',
    statusLabel:'Currently Working Here',
    useMonthPicker:true,
    useMonthPickerStatus:true
  },
   education:{
    title:'SchoolName',
    sub: 'Degree',
    showCity: true,
    showLink: false,
    showEmploymentType:false,
    labelName: "Start & End Date",
    statusLabel: "Currently Study Here",
    useMonthPicker: true,
    useMonthPickerStatus:true
  },
   portofolio:{
    title:'ProjectName',
    sub:'ProjectType',
    showCity: false,
    showLink: true,
    showEmploymentType:false,
    labelName: "Start & End Date",
    statusLabel: null,
    useMonthPicker: true,
    useMonthPickerStatus:false
  },
   course:{
    title:'Course',
    sub:'Institution',
    showCity: false,
    showLink: false,
    showEmploymentType:false,
    labelName: "Start & End Date",
    statusLabel: null,
    useMonthPicker: true,
    useMonthPickerStatus:false
  },
  volunteering:{
    title:'Role',
    sub:'Institution',
    showCity: true,
    showLink: false,
    showEmploymentType:false,
    labelName: "Start & End Date",
    statusLabel: "Currently Volunteering Here",
    useMonthPicker: true,
    useMonthPickerStatus:true
  }
 } as const
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
 const monthPickerOptions = computed<MonthPickerConfig[]>(() => [
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
     disable:endDateModel.value === 'Present',
     methods:(data:string) => {
      if(data){
       endDateModel.value = data
       toggleMonthPicker(1)
      }
     }
    }
  ])
  const currentTitle = computed(() => fieldConfig[props.parent].title || 'Title')
  const currentSub = computed(() => fieldConfig[props.parent].sub || 'Subtitle')
  const labelName = computed(() => fieldConfig[props.parent].labelName)
  const useMonthPicker = computed(() => fieldConfig[props.parent].useMonthPicker)
  const useMonthPickerStatus = computed(() => fieldConfig[props.parent].useMonthPickerStatus)
  const statusLabel = computed(() => fieldConfig[props.parent].statusLabel)
  const showCityInput = computed(() => fieldConfig[props.parent].showCity)
  const showLinkInput = computed(() => fieldConfig[props.parent].showLink)
  const showEmploymentType = computed(() => fieldConfig[props.parent].showEmploymentType)
  function toggleMonthPicker(index:number):void{
    activeIndex.value = activeIndex.value === index ? null : index
    showMonthPicker.value = activeIndex.value === index
  }
  function updateEndDateModel(event:Event):void{
   const target = event.target as HTMLInputElement
   if(target.checked){
    endDateModel.value = 'Present'
    activeIndex.value = null
    showMonthPicker.value = false
   }else{
    endDateModel.value = ''
   }
  }
</script>

<template>
<<<<<<< HEAD
  <div class="accordion-content grid grid-cols-1 md:grid-cols-2 gap-y-1">
=======
  <div class="accordion-content grid grid-cols-2 gap-2">
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
    <div class="flex title-container flex-col p-1 gap-3">
      <label class="font-semibold text-md" for="title">{{ currentTitle }}</label>
      <input type="text" v-model="titleModel" id="title" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
    </div>
    <div class="flex sub-container flex-col p-1 gap-3">
      <label class="font-semibold text-md" for="sub">{{ currentSub }}</label>
      <input type="text" v-model="subModel" id="sub" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
    </div>
<<<<<<< HEAD
    
=======
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
    <div class="flex date-container flex-col p-1 gap-2 relative">
      <span class="font-semibold text-md">{{ labelName }}</span>
      <div v-if="useMonthPicker" class="flex flex-col gap-2">
       <div class="option-container w-full flex gap-3 p-1 text-center">
        <button @click="toggleMonthPicker(0)" class="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none cursor-pointer transition-all duration-200" :class="{'ring-2 ring-blue-500 border-blue-500' : activeIndex == 0}">
          <span class="font-thin text-md">{{ startDateModel || 'MM/YYYY' }}</span>
        </button>
        <button @click="toggleMonthPicker(1)" class="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none cursor-pointer transition-all duration-200" :class="{'ring-2 ring-blue-500 border-blue-500' : activeIndex == 1}">
          <span class="font-thin text-md">{{ endDateModel || 'MM/YYYY' }}</span>
        </button>
       </div>
       <div v-if="showMonthPicker" class= "z-10 absolute mt-15 p-1 max-w-sm w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-70 overflow-auto">
         <MonthPicker v-if="activeIndex !== null" :disabled-button="monthPickerOptions[activeIndex].disable" @on-update="monthPickerOptions[activeIndex].methods"></MonthPicker>
       </div>
<<<<<<< HEAD
       
       <div v-if="useMonthPickerStatus" class="status-button-container">
         <label class="relative flex justify-between items-center group p-1">
            {{ statusLabel }}
=======
       <div v-if="useMonthPickerStatus" class="status-button-container">
         <label class="relative flex justify-between items-center group p-1">
           {{ statusLabel }}
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
          <input type="checkbox" @change="updateEndDateModel" :checked="endDateModel === 'Present'" class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
          <span class="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
        </label>
       </div>
      </div>
    </div>
<<<<<<< HEAD

=======
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
    <div class="flex flex-col p-1 gap-2 con">
      <div v-if="showCityInput" class="flex flex-col p-1 gap-2 city-container">
       <label class="font-semibold text-md" for="city">City</label>
       <input type="text" v-model="cityModel" id="city" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
      </div>
      <div v-if="showEmploymentType" class="dropdown container p-1 relative flex flex-col gap-2">
        <span class="font-semibold text-md">Employment Types</span>
        <Dropdow v-model:selected-option="employmentTypesModel" :options="types"></Dropdow>
      </div>
      <div v-if="showLinkInput" class="flex flex-col p-1 gap-2 link-container">
       <label class="font-semibold text-md" for="link">Link</label>
       <input type="url" v-model="linkModel" id="link" class="p-2 rounded-sm bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"/>
      </div>
    </div>
<<<<<<< HEAD

    <div class="descriptionEditor-container col-span-1 md:col-span-2">
=======
    <div class="descriptionEditor-container col-span-2">
>>>>>>> b08635fc0590e8a2f5c940e5ca8fe47aa9c2752d
      <label class="font-semibold text-md mb-1" for="description">Description</label>
      <slot></slot>
    </div>
  </div>
</template>