import { Ref, ref } from "vue";

type TourStepSetupFunction = (step: number, oldStep?: number) => Promise<void>;

interface BaseTourStepContent {
  title: string;
  text: string;
  instaText?: string;
  setup?: TourStepSetupFunction;
  awaitSetup?: boolean;
}

interface UseTourOptions<T extends BaseTourStepContent> {
  steps: T[];
  initialStep?: number;
}

function clamp(value: number, minValue: number, maxValue: number): number {
  return Math.min(maxValue, Math.max(minValue, value));
}

export function useTour<T extends BaseTourStepContent>(options: UseTourOptions<T>) {
  const stepNumber = clamp(options.initialStep ?? 0, 0, options.steps.length - 1);
  const step = ref(stepNumber);
  const initialContent: T = options.steps[step.value];
  const content: Ref<T> = ref(initialContent);

  async function goToStep(newStep: number) {
    if (newStep === step.value) {
      return;
    }

    const clampedNew = clamp(newStep, 0, options.steps.length - 1);
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
    content.value = newStepContent;
  }


}
