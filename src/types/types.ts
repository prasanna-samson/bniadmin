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
  

 // types/types.ts
export interface UserCore {
  _id: string;
  title: string;
  name: string;
  bniId?: string; // Made optional as it's not always present
  gender: string;
  company: string;
  email: string;
  mobile: string;
  chapter: string;
  dob?: string; // Optional as it might not be present
  doj?: string; // Optional as it might not be present
  role: string;
  city: string;
  state: string;
  country: string;
  team: string;
  role1?: string; // Optional, as it might not be provided
  responsibility1?: string; // Optional, as it might not be provided
  role2?: string; // Optional, as it might not be provided
  responsibility2?: string; // Optional, as it might not be provided
}

// types/types.ts
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
  dob?: string;
  doj?: string;
  role: string;
  city: string;
  state: string;
  country: string;
  team: string;
  role1?: string;
  responsibility1?: string;
  role2?: string;
  responsibility2?: string;
}

export interface GetUserResponse {
  success: boolean;
  data: UserCore[];
  pagination: {
    totalUsers: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
}

// types.ts



// types/types.ts
export interface UserCore {
_id: string;
title: string;
name: string;
bniId?: string; // Made optional as it's not always present
gender: string;
company: string;
email: string;
mobile: string;
chapter: string;
dob?: string; // Optional as it might not be present
doj?: string; // Optional as it might not be present
role: string;
city: string;
state: string;
country: string;
team: string;
role1?: string; // Optional, as it might not be provided
responsibility1?: string; // Optional, as it might not be provided
role2?: string; // Optional, as it might not be provided
responsibility2?: string; // Optional, as it might not be provided
}

// types/types.ts
export interface Member {
_id: string;
title: string;
name: string;
bniId?: string;
gender: string;
companyName: string;
email: string;
mobile: string;
chapter: string;
dob?: string;
doj?: string;
role: string;
city: string;
state: string;
country: string;
team: string;
role1?: string;
responsibility1?: string;
role2?: string;
responsibility2?: string;
}

export interface GetMemberResponse {
success: boolean;
data: Member[];
pagination: {
  totalMembers: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
};
}
