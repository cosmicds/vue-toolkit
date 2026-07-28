import { watch, type Ref } from "vue";
import type { Step, StepOptions, StepOptionsButton, Tour, TourOptions } from "shepherd.js";
import { useShepherd } from "vue-shepherd";

export const backButton: StepOptionsButton = {
  action() { return this.back(); },
  classes: "shepherd-button-back",
  text: "Back",
};

export const nextButton: StepOptionsButton = {
  action() { return this.next(); },
  classes: "shepherd-button-next",
  text: "Next",
};

export const endButton: StepOptionsButton = {
  action() { return this.next(); },
  classes: "shepherd-button-next",
  text: "Finish",
};

export interface DirectionalButtonOptions {
  classes?: string;
  text?: string;
}

export function createBackButton(options: DirectionalButtonOptions): StepOptionsButton {
  return {
    action() { return this.back(); },
    classes: options?.classes ?? "shepherd-button-back",
    text: options?.text ?? "Back",
  };
}

export function createNextButton(options: DirectionalButtonOptions): StepOptionsButton {
  return {
    action() { return this.next(); },
    classes: options?.classes ?? "shepherd-button-next",
    text: options?.text ?? "Back",
  };
}

function _setProgressDotsAfterDisabled(step: Step) {
  const tour = step.tour;
  const element = step.getElement();
  const dots = element?.querySelectorAll(".shepherd-progress-dots");
  if (!dots) { return; }
  const stepIndex = tour.steps.indexOf(step);
  if (stepIndex > -1) {
    dots.forEach((dot, index) => {
      if (index > stepIndex) {
        dot.setAttribute("disabled", "");
      } else {
        dot.removeAttribute("disabled");
      }
    });
  }
}

export function addProgressDots(step: Step) {
  const stepElement = step.getElement();
  const tour: Tour = step.tour;
  if (!stepElement) {
    return;
  }
  const footer = stepElement.querySelector(".shepherd-footer");
  if (!footer) {
    return;
  }
  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("shepherd-progress-dots");
  const currentIndex = tour.steps.indexOf(step);

  const maxStepReached = getMaxStepReached(tour);
  const hasAnyGated = getGatedSteps(tour).size > 0;
  tour.steps.forEach((_step, index) => {
    const dot = document.createElement("div");
    dot.classList.add("shepherd-progress-dot");
    if (index === currentIndex) {
      dot.classList.add("active");
    }
    dot.setAttribute("role", "button");
    dot.setAttribute("tabindex", "0");
    dot.setAttribute("aria-label", `Go to step ${index + 1}`);
    if (hasAnyGated && index > maxStepReached) {
      dot.setAttribute("disabled", "");
    } else {
      const goToStep = () => tour.show(index);
      dot.addEventListener("click", goToStep);
      dot.addEventListener("keyup", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          goToStep();
        }
      });
    }
    dotsContainer.appendChild(dot);
  });
  footer.appendChild(dotsContainer);
}

export function addProgressBar(step: Step) {
  const stepElement = step.getElement();
  const tour = step.tour;
  if (!stepElement) {
    return;
  }
  const content = stepElement.querySelector(".shepherd-content");
  const footer = stepElement.querySelector(".shepherd-footer");
  const progressContainer = document.createElement("div");
  progressContainer.classList.add("shepherd-progress-container");
  const progress = document.createElement("div");
  progress.classList.add("shepherd-progress-bar");
  const index = tour.steps.indexOf(step);
  progress.setAttribute("aria-label", `On step ${index + 1} of ${tour.steps.length}`);
  const percent = 100 * (index + 1) / tour.steps.length;
  progress.style.width = `${percent}%`;
  progress.style.backgroundColor = "#068ede";
  progressContainer.appendChild(progress);
  if (footer) {
    content?.insertBefore(progressContainer, footer);
  }
}

export function useMdiCloseIcon(step: Step) {
  const stepElement = step.getElement();
  const cancelIcon = stepElement?.querySelector(".shepherd-cancel-icon");
  if (!cancelIcon) {
    return;
  }
  cancelIcon.replaceChildren();
  const icon = document.createElement("span");
  icon.classList.add("mdi", "mdi-close");
  icon.setAttribute("aria-hidden", "true");
  cancelIcon.appendChild(icon);
}

export function addImage(step: Step, src: URL) {
  const stepElement = step.getElement();
  const textContainer = stepElement?.querySelector(".shepherd-text");
  if (!(stepElement && textContainer)) {
    return;
  }
  const img = document.createElement("img");
  const width = stepElement.getBoundingClientRect().width;
  img.src = src.href;
  img.style.width = `${width - 20}px`;
  img.style.display = "block";
  img.style.marginTop = "12px";
  img.style.marginLeft = "auto";
  img.style.marginRight = "auto";
  img.style.marginBottom = "10px";
  img.style.border = "1px solid rgba(255, 255, 255, 0.35)";
  img.style.borderRadius = "4px";
  textContainer.appendChild(img);
}

export function defaultStepShow(step: Step) {
  addProgressDots(step);
  useMdiCloseIcon(step);
}

function getGatedSteps(tour: Tour): Set<number> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error We're manipulating the tour object here
  return (tour.gatedSteps = tour.gatedSteps ?? new Set()) as Set<number>;
}

function setStepGated(tour: Tour, stepIndex: number, gated: boolean) {
  const gatedSteps = getGatedSteps(tour);
  if (gated) {
    gatedSteps.add(stepIndex);
  } else {
    gatedSteps.delete(stepIndex);
  }
}

function getMaxStepReached(tour: Tour): number {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error We're manipulating the tour object here
  return tour.maxStepReached ?? 0;
}

function setMaxStepReached(tour: Tour, maxStep: number) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error We're manipulating the tour object here
  return tour.maxStepReached = maxStep;
}

export type CosmicDSStepOptions = StepOptions & {
  allowNext?: Ref<boolean>;
};

function onAllowNextChange(tour: Tour, allow: boolean) {
  const step = tour.currentStep;
  const element = step?.getElement();
  if (!(step && element)) { return; }

  const nextButton = element.querySelector(".shepherd-button-next");
  if (nextButton) {
    if (allow) {
      nextButton.removeAttribute("disabled");
    } else {
      nextButton.setAttribute("disabled", "");
    }
  }
}

export function addStep(tour: Tour, options: CosmicDSStepOptions) {
  const allowNext = options.allowNext;
  if (allowNext != null) {
    watch(allowNext, (allow: boolean) => onAllowNextChange(tour, allow));

    if (!allowNext.value) {
      setStepGated(tour, tour.steps.length, true);  // The new step will be added at the end
    }
  }
  tour.addStep(options);
}

export const DEFAULT_TOUR_OPTIONS: TourOptions = {
  useModalOverlay: true,
  defaultStepOptions: {
    buttons: [backButton, nextButton],
    cancelIcon: {
      enabled: true,
    },
    when: {
      show() {
        defaultStepShow(this as Step);
      },
    }
  },
};

export function createTour(options: TourOptions) {
  const tour: Tour = useShepherd({
    ...DEFAULT_TOUR_OPTIONS,
    ...options,
  });

  tour.on("show", (event: { step: Step }) => {
    const newStep = event.step;
    if (!newStep) { return; }
    const newIndex = tour.steps.indexOf(newStep);
    setMaxStepReached(tour, newIndex);
  });

  return tour;
}
