import { Ref, ref } from "vue";

type TourStepSetupFunction = (step: number, oldStep?: number) => Promise<void>;

export interface BaseTourStepContent {
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
  step: Ref<number>;
  length: number;
  stepContent: Ref<T>;
  goToStep: (step: number) => Promise<void>;
  next: () => Promise<void>;
  previous: () => Promise<void>;
};

function clamp(value: number, minValue: number, maxValue: number): number {
  return Math.min(maxValue, Math.max(minValue, value));
}

export function useTour<T extends BaseTourStepContent>(options: UseTourOptions<T>) {
  const stepNumber = clamp(options.initialStep ?? 0, 0, options.steps.length - 1);
  const step = ref(stepNumber);
  const initialContent: T = options.steps[step.value];
  const stepContent = ref(initialContent) as Ref<T>;

  async function goToStep(newStep: number) {
    const clampedNew = clamp(newStep, 0, options.steps.length - 1);
    if (clampedNew === step.value) {
      return;
    }

    const newStepContent = options.steps[clampedNew];
    const setup = newStepContent.setup;
    if (setup) {
      if (newStepContent.awaitSetup ?? true) {
        await setup(clampedNew, step.value);
      } else {
        setup(clampedNew, step.value);
      }
    }
    step.value = newStep;
    stepContent.value = newStepContent;
  }

  async function next() {
    goToStep(step.value + 1);
  }

  async function previous() {
    goToStep(step.value - 1);
  }

  return {
    steps: options.steps,
    step,
    length: options.steps.length,
    stepContent,
    goToStep,
    previous,
    next,
  };

}
