import type { Decorator } from "@storybook/vue3";

export const descriptionDecorator: Decorator = (_story, parameters) => ({
  template: `
    <div>
      <div>${parameters.description}</div>
      <story/>
    </div>
  `
});

/**
 * This uses the browser to generate the color string.
 * This should generally be an rgb color string, but this way
 * requires zero maintenance as we don't need to worry about what
 * the browser is going to do.
 */
export function styleColor(color: string): string {
  const div = document.createElement("div");
  div.style.color = color;
  document.body.appendChild(div);
  const rgb = window.getComputedStyle(div).color;
  div.remove();
  return rgb;
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve, _reject) => setTimeout(resolve, ms));
}
