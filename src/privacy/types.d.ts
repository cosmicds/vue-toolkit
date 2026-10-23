/** minimal tracking data type */
export interface TrackingData {
    user_uuid: string;
    app_time_ms: number;
    [key: string]: string | number;
}
