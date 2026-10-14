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
}
export interface Tour<T extends BaseTourStepContent> {
    stepID: Ref<string>;
    stepIndex: Ref<number>;
    steps: T[];
    length: number;
    stepContent: Ref<T>;
    goToStep: (step: number) => Promise<void>;
    next: () => Promise<void>;
    previous: () => Promise<void>;
}
export declare function useTour<T extends BaseTourStepContent>(options: UseTourOptions<T>): {
    steps: T[];
    stepIndex: Ref<number, number>;
    stepID: import('vue').WritableComputedRef<string, string>;
    stepContent: import('vue').ComputedRef<T>;
    goToStep: (newStep: number | string, force?: boolean) => Promise<void>;
    previous: () => Promise<void>;
    next: () => Promise<void>;
};
export {};
