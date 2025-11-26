export interface biodata{
  jobTitle:string,
  photoPreview:string,
  firstName:string,
  lastName:string,
  email:string,
  phone:string,
  address:string,
  dateOfBirth:string,
  placeOfBirth:string,
  city:string,
  country:string,
  postalCode:string,
  drivingLicense:string,
  nationality:string
}

export interface workExperice {
  id:string,
  jobTitle:string,
  employer:string,
  startDate:string,
  endDate:string,
  city:string,
  description:string,
}

export interface education {
  id:string,
  schoolName:string,
  degree:string,
  startDate:string,
  endDate:string,
  city:string,
  description:string,
}

export interface socialMedia {
  id:string,
  label:string,
  link:string,
}

export type levelName = 'Beginner' | 'Intermediate' | 'Experienced' | 'Expert'
export interface skills {
  id:string,
  name:string,
  level:levelName,
}

export type languageSpeakingLevel = 'Native Speaker' | 'Highly Proficient' | 'Very Good Command' 
export interface language {
  id:string,
  languageName:string,
  languageLevel:languageSpeakingLevel | null
}

export interface portofolio {
  id:string,
  projectName:string,
  projectType:string,
  projectLink:string,
  startDate:string,
  endDate:string,
  description:string,
}

export interface course {
  id:string,
  courseName:string,
  institution:string,
  startDate:string,
  endDate:string,
  description:string,
}

export interface awards {
  id:string,
  awardsName:string,
  institution:string,
  year:number | null,
  description:string,
}

export interface volunteering {
  id:string,
  role:string,
  institution:string,
  startDate:string,
  endDate:string,
  city:string,
  description:string
}