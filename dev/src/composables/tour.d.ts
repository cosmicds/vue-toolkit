import { Ref } from 'vue';
type TourStepSetupFunction = (step: number, oldStep?: number) => Promise<void>;
export interface BaseTourStepContent {
    id: string;
    title: string;
    text: string[];
    instaText?: string;
    setup?: TourStepSetupFunction;
    awaitSetup?: boolean;
}
export interface UseTourOptions<T extends BaseTourStepContent> {
    steps: T[];
    initialStep?: number;
    /** run the initial step's setup() as soon as the tour is created. Default: false */
    autostart?: boolean;
}
export interface Tour<T extends BaseTourStepContent> {
    stepID: Ref<string>;
    stepIndex: Ref<number>;
    steps: T[];
    length: number;
    stepContent: Ref<T>;
    goToStep: (step: number, force?: boolean) => Promise<void>;
    next: () => Promise<void>;
    previous: () => Promise<void>;
}
export declare function useTour<T extends BaseTourStepContent>(options: UseTourOptions<T>): Tour<T>;
export {};
