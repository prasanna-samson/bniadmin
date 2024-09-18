// types.ts
export enum MeetingDay {
    Sunday = 'Sunday',
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
  }
  
  export interface Chapter {
    _id: string;
    chapter: string; // Previously `name`, now `chapter`
    meetingDay: MeetingDay;
  }
  

  // types.ts
// types.ts
export interface UserCore {
    _id: string;
    title: string;
    name: string;
    bniId?: string;
    gender: string;
    company: string;
    email: string;
    mobile: string;
    chapter: string;
    dob?: string; // Date as string for display/input purposes
    doj?: string;
    city: string;
    state: string;
    country: string;
    team: string;
    role1?: string;
    responsibility1?: string;
    role2?: string;
    responsibility2?: string;
  }
  