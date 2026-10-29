import { Ref } from 'vue';
import { Step, StepOptions, StepOptionsButton, Tour, TourOptions } from 'shepherd.js';
export interface CosmicDSDirectionalButtonOptions {
    classes?: string;
    text?: string;
    disabled?: boolean | (() => boolean);
}
export type CosmicDSStepOptions = StepOptions & {
    allowNext?: Ref<boolean>;
};
export type CosmicDSTourProgressOption = "dots" | "bar" | "none";
export type CosmicDSTourOptions = TourOptions & {
    progress?: CosmicDSTourProgressOption;
};
export declare function createBackButton(options?: CosmicDSDirectionalButtonOptions): StepOptionsButton;
export declare function createNextButton(options?: CosmicDSDirectionalButtonOptions): StepOptionsButton;
export declare function addProgressDots(step: Step): void;
export declare function addProgressBar(step: Step): void;
export declare function useMdiCloseIcon(step: Step): void;
export declare function addImage(step: Step, src: URL): void;
export declare function addStep(tour: Tour, options: CosmicDSStepOptions): void;
export declare function createTour(options?: CosmicDSTourOptions): Tour;
