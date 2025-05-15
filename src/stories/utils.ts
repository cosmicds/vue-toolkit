import type { Decorator } from "@storybook/vue3";

export const descriptionDecorator: Decorator = (_story, parameters) => ({
  template: `
    <div>
      <div>${parameters.description}</div>
      <story/>
    </div>
  `
});
