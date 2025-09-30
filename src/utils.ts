export const D2R = Math.PI / 180;
export const R2D = 180 / Math.PI;

export const API_BASE_URL = "https://api.cosmicds.cfa.harvard.edu";
export const MINIDS_BASE_URL = `${API_BASE_URL}/minids`;

export type UserExperienceRating = "very_bad" | "poor" | "good" | "excellent";
export const DEFAULT_RATING_COLORS = ["red", "orange", "lightgreen", "green"];

export interface UserExperienceSubmissionInfo {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  story_name: string;
  uuid: string;
  comments?: string;
  rating?: UserExperienceRating;
}

export async function submitUserExperienceRating(
  info: UserExperienceSubmissionInfo,
  apiKey: string,
  url?: string
): Promise<Response | null> {
  const body: UserExperienceSubmissionInfo = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    story_name: info.story_name,
    uuid: info.uuid,
  };
  if (info.comments) {
    body.comments = info.comments;
  }
  if (info.rating) {
    body.rating == info.rating;
  }
  const destination = url ?? `${API_BASE_URL}/stories/user-experience`;
  return fetch(destination, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Authorization": apiKey,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Content-Type": "application/json",
    },
  })
    .catch(error => {
      console.error(error);
      return null;
    });
}
