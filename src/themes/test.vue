<script setup lang="ts">
 import type { themesProps,themesConfigProps } from '../utils/component.interface';
 import IconRendered from '../component/IconRendered.vue';
 defineProps<{
  data:themesProps,
  themesData:themesConfigProps
  style:any
  }>()
</script>

<template>
  <div :class="[themesData.fontsSize,themesData.lineHeight,style.base]" :style="{fontFamily:themesData.primaryFonts}" id="test">
    <header :class="style.header">
      <div :class="style.infoHeader">
        <div class="main-title">
          <h1 :class="style.jobTitle">{{ data.header.jobTitle }}</h1>
          <h2 :class="style.name">{{ data.header.firstName }} {{ data.header.lastName }}</h2>
        </div>
        <div :class="style.contact">
          <div class="flex gap-2">
            <IconRendered v-if="themesData.supportedIcons && data.header.phone" name="phone" :icon-color-accents="themesData.iconColorAccents" size="20"></IconRendered>
            <span>{{ data.header.phone }}</span>
          </div>
          <div class="flex gap-2">
            <IconRendered v-if="themesData.supportedIcons && data.header.email" name="email" :icon-color-accents="themesData.iconColorAccents" size="20"></IconRendered>
            <span>{{ data.header.email }}</span>
          </div>
          <div v-for="item in data.socialMedia" :key="item.id" class="flex gap-2">
            <IconRendered v-if="themesData.supportedIcons" :name="item.label" size="20" :icon-color-accents="themesData.iconColorAccents"></IconRendered>
            <a rel="noopener" target="_blank" :href="item.link" class="no-underline">
              {{ item.label }}
            </a>
          </div>
        </div>
      </div>
      <div :class="style.additionalInfo">
        <span v-for="item in data.addtionalDetails" :key="item.id">
          {{ item.name }} : {{ item.value }}
        </span>
      </div>
    </header>
    <main :class="style.main">
      <div v-if="data.summary.length" :class="[style.summary,style.summaryContent]">
        <h3 :class="style.sectionTitle">Profile</h3>
        <p v-html="data.summary"></p>
      </div>
      <div v-if="data.addtionalInformation.length" :class="[style.summary,style.summaryContent]">
        <h3 :class="style.sectionTitle">Addtional Details</h3>
        <p v-html="data.addtionalInformation"></p>
      </div>
      <!-- experience section -->
      <div class="experience" v-if="data.experience.length > 0">
        <h3 :class="style.sectionTitle">Work experience</h3>
        <div v-for="item in data.experience" :class="style.sectionItem" :key="item.id">
           <div :class="style.sectionHeader">
             <h4 :class="style.sectionHeaderTitle">{{ item.jobTitle }}</h4>
             <div :class="style.sectionHeaderInfo">
               <h5>{{ item.employer }} , {{ item.city }} - {{ item.employmentTypes }}</h5>
               <h5>{{ item.startDate }} - {{ item.endDate }}</h5>
             </div>
           </div>
           <div :class="style.sectionDesc">
             <p v-html="item.description"></p>
           </div>
        </div>
      </div>
      <!-- end experience section -->
      <!-- start education section -->
       <div class="education" v-if="data.education.length">
         <h3 :class="style.sectionTitle">Education</h3>
         <div v-for="item in data.education" :class="style.sectionItem" :key="item.id">
           <div :class="style.sectionHeader">
             <h4 :class="style.sectionHeaderTitle">{{ item.degree }} at {{ item.schoolName }}</h4>
             <h5 :class="style.sectionHeaderInfo">{{ item.city }}, {{ item.startDate }} - {{ item.endDate }}</h5>
           </div>
          <div :class="style.sectionDesc">
           <p v-html="item.description"></p>
          </div>
         </div>
       </div>
      <!-- end education section -->
      <!-- start skills section -->
       <div class="skills" v-if="data.skills.length">
         <h3 :class="style.sectionTitle">Skills</h3>
         <div v-for="item in data.skills" :class="style.testSectionItem" :key="item.id">
           <div :class="style.testSectionHeader">
             <h4 :class="style.testSectionInfo">{{ item.name }} - {{ item.level }} </h4>
           </div>
         </div>
       </div>
      <!-- end skills section -->
      <!-- start course section -->
       <div class="course" v-if="data.course.length">
         <h3 :class="style.sectionTitle">Course</h3>
         <div v-for="item in data.course" :class="style.sectionItem" :key="item.id">
           <div :class="style.sectionHeader">
             <h4 :class="style.sectionHeaderTitle">{{ item.courseName }} - {{ item.institution }}</h4>
             <h5 :class="style.sectionHeaderInfo">{{ item.startDate }} - {{ item.endDate }}</h5>
           </div>
           <div :class="style.sectionDesc">
             <p v-html="item.description"></p>
           </div>
         </div>
       </div>
      <!-- end course section -->
      <!-- start portofolio section -->
       <div class="portofolio" v-if="data.portofolio.length">
         <h3 :class="style.sectionTitle">Portofolio</h3>
         <div v-for="item in data.portofolio" :class="style.sectionItem" :key="item.id">
           <div :class="style.sectionHeader">
             <h4 :class="style.sectionHeaderTitle">
              <a :href="item.projectLink" rel="noopener" target="_blank" class="no-underline">{{ item.projectName }}</a>
              <span class="separator"> - </span>
              {{ item.projectType }}
             </h4>
             <h5 :class="style.sectionHeaderInfo">{{ item.startDate }} - {{ item.endDate }}</h5>
           </div>
           <div :class="style.sectionDesc">
             <p v-html="item.description"></p>
           </div>
         </div>
       </div>
      <!-- end portofolio section -->
      <!-- start volunteering section -->
      <div class="volunteering" v-if="data.volunteering.length">
        <h3 :class="style.sectionTitle">Volunteering</h3>
        <div v-for="item in data.volunteering" :class="style.sectionItem" :key="item.id ">
          <div :class="style.sectionHeader">
            <h4 :class="style.sectionHeaderTitle">{{ item.role }} at {{ item.institution }}</h4>
            <h5 :class="style.sectionHeaderInfo">{{ item.city }} {{ item.startDate }} - {{ item.endDate }}</h5>
          </div>
          <div :class="style.sectionDesc">
            <p v-html="item.description"></p>
          </div>
        </div>
      </div>
      <!-- end volunteering section -->
      <!-- start language section -->
      <div class="language" v-if="data.language.length">
        <h3 :class="style.sectionTitle">Language</h3>
        <div v-for="item in data.language" :class="style.testSectionItem" :key="item.id">
          <div :class="style.testSectionHeader">
            <h4 :class="style.testSectionInfo">{{ item.languageName }} - {{ item.languageLevel }} </h4>
          </div>
        </div>
      </div>
      <!-- end language section -->
    </main>
  </div>
</template>

<style scoped>
#test .sectionDesc ul {
  list-style-type: disc;
  margin-left: 1.25rem;
  margin-top: 0.5rem;
}

#test .no-underline {
  text-decoration: none;
  transition: color 0.2s;
}

#test .no-underline:hover {
  text-decoration: underline;
}
</style>
