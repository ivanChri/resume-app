export const fieldConfig = {
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

export const labelConfig = {
   experience:{
    title:'Employment History',
    buttonLabel:'Add Experience',
   },
   education:{
    title:'Education',
    buttonLabel:'Add Education'
   },
   portofolio:{
    title:'Portofolio/Personal Project',
    buttonLabel:'Add Portofolio'
   },
   course:{
    title:null,
    buttonLabel:'Add Course'
   },
   awards:{
    title:null,
    buttonLabel:'Add Awards'
   },
   volunteering:{
    title:null,
    buttonLabel:'Add Volunteering'
   }
 } as const