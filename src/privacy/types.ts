/** minimal tracking data type */
export interface TrackingData {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_uuid: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  app_time_ms: number;
  [key: string]: string | number;
}

/** PUT body for the "/user-experience" endpoint - story_name is filled in server-side, don't send it */
export interface UserExperienceSubmission {
  uuid: string;
  question: string;
  rating?: string;
  comments?: string;
}
