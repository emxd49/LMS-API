export interface ICourse {
  _id?: string; // Unique identifier for the course
  courseTitle: string; // Title of the course
  courseType: string; //e.g certification,free,video,interactive
  lessons?: ILesson[];
  description: string; // Description of the course
  duration: number; // Course Duration
  created_date: Date;
  enrolled?: boolean;
}

export interface ILesson {
  title: string;
  description: string;
  duration: number;
}

export interface IEnrolledCourses {
  [user: string]: string[];
}
export interface ICourseLessons {
  [course_id: string]: ILesson[];
}

export interface IUser {
  username: string;
  password: string;
}

export interface IUserAuthRes {
  username: string;
  accessToken: string;
  refreshToken: string;
}
