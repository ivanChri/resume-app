<script setup lang="ts" generic="T extends Record<string, any>">
 import { computed } from 'vue';
 import type { computedSection } from '../utils/types/themes.interface';
 const props = defineProps<computedSection<T>>()
 const isStandardSection = computed(() => {
   return props.name !== 'skills' && props.name !== 'language'
 })
 const optionalKeys = computed(() => {
   return {
     city:props.keys.city ?? 'city',
     link:props.keys.link ?? 'link',
     startDate:props.keys.startDate ?? 'startDate',
     endDate:props.keys.endDate ?? 'endDate',
     employmentTypes:props.keys.employmentTypes ?? 'employmentTypes'
   }
 })
</script>

<template>
  <div v-if="data.length" class="section">
    <h3 :class="style.sectionTitle">{{ props.name }}</h3>
    <div v-for="item in data" :key="item[keys.id]">
     <!-- start-long-format-content -->
     <div v-if="isStandardSection" :class="style.sectionItem">
      <div :class="style.sectionHeader">
        <div :class="style.sectionHeaderTitle">
          <h4 v-if="name === 'experience'">
           {{ item[keys.title] }}
          </h4>
          <h4 v-else-if="name === 'education'">
           {{ item[keys.sub] }} at {{ item[keys.title] }}
         </h4>
         <h4 v-else-if="name === 'portfolio'">
           <a :href="item[keys.link ?? 'link']" rel="noopener" target="_blank" class="no-underline">{{ item[keys.title] }}</a>
           <span class="separator"> - </span>
           <span>{{ item[keys.sub] }}</span>
         </h4>
         <h4 v-else>
           {{ item[keys.title] }} - {{ item[keys.sub] }}
         </h4>
        </div>
        <div :class="style.sectionHeaderInfo" class="section-header-info">
          <h5 v-if="name === 'experience'">
            {{ item[keys.sub] }} , {{ item[optionalKeys.city] }} - {{ item[optionalKeys.employmentTypes] }}
            {{ item[optionalKeys.startDate] }} - {{ item[optionalKeys.endDate] }}
          </h5>
          <h5 v-else-if="name === 'education' || name === 'volunteering' || name === 'organization'">
            {{ item[optionalKeys.city] }} {{ item[optionalKeys.startDate] }} - {{ item[optionalKeys.endDate] }}
          </h5>
          <h5 v-else>
            {{ item[optionalKeys.startDate] }} - {{ item[optionalKeys.endDate] }}
          </h5>
        </div>
      </div>
      <div :class="style.sectionDesc" class="section-desc">
        <p v-html="item.description"></p>
      </div>
    </div>
    <!-- end-long-format-content -->
    <!-- start-short-format-content -->
    <div v-else :class="style.additionalSectionItem" class="additional-section-item">
      <div :class="style.additionalSectionHeader">
        <h4 :class="style.additionalSectionInfo">
          {{ item[keys.title] }} - {{ item[keys.sub]}}
        </h4>
      </div>
    </div>
    <!-- end-short-format-content -->
   </div>
  </div>
</template>