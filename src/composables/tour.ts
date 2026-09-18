import { Ref, ref, watch } from "vue";

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
  steps: T[];
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
    return updateStep(newStep, step.value, false);
  }

  async function updateStep(newStep: number, oldStep?: number, force?: boolean) {
    const clampedNew = clamp(newStep, 0, options.steps.length - 1);
    if (clampedNew === oldStep  && !force) {
      return;
    }

    const newStepContent = options.steps[clampedNew];
    const setup = newStepContent.setup;
    if (setup) {
      if (newStepContent.awaitSetup ?? true) {
        await setup(clampedNew, oldStep);
      } else {
        setup(clampedNew, oldStep);
      }
    }
    step.value = newStep;
    stepContent.value = newStepContent;
  }

  updateStep(step.value, step.value, true);

  watch(step, (newStep: number, oldStep: number) => {
    updateStep(newStep, oldStep, false);
  });

  async function next() {
    step.value += 1;
  }

  async function previous() {
    step.value -= 1;
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
