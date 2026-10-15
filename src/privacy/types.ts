/** minimal tracking data type */
export interface TrackingData {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_uuid: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  app_time_ms: number;
  [key: string]: string | number;
}

