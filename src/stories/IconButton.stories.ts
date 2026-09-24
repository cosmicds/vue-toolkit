/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryContext, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { IconButtonProps } from "../types";
import { IconButton } from "..";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

import "./stories.css";
import { styleColor } from "./utils";

library.add(faBookOpen);

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Icon Button",
};

export default meta;
type Story = StoryObj<typeof IconButton>;
type Args = Story["args"];

const defaultArgs = {
  modelValue: false,
  icon: "book-open",
  ariaLabel: "Information",
  color: "white",
  focusColor: "red",
  activeColor: "green",
  backgroundColor: "#040404",
  border: true,
  longPressTimeMs: 500,
  tooltipText: "Tooltip",
  tooltipLocation: "start",
  tooltipOnClick: false,
  tooltipOnFocus: false,
  tooltipOnHover: true,
  showTooltip: true,
  size: "lg",
  disabled: false,
};

export const Primary: Story = {
  render: (args: IconButtonProps) => ({
    components: { IconButton },
    template: `<IconButton v-bind="args" />`,
    setup() {
      return { args };
    }
  }),
  decorators: [
    () => {
      return { template: `<div style="width: 50px"><story /></div>` };
    }
  ],
  args: defaultArgs,
  play: async (context: StoryContext<Args>) => {
    // Ensure that we're starting with the default conditions.
    // On the Storybook page, the status may have changed
    Object.assign(context.args, defaultArgs);
    const args = context.args as Args & (typeof defaultArgs);
    const canvasElement = context.canvasElement;
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button");
    await userEvent.hover(button);
    let tooltip = document.querySelector(".v-tooltip");
    expect(tooltip).toBeInstanceOf(HTMLElement);
    tooltip = tooltip as HTMLElement;
    const tooltipContent = tooltip.querySelector(".v-overlay__content");

    const tooltipVisible = () => {
      expect(tooltipContent).toBeVisible();
      expect(tooltipContent).toHaveTextContent(args.tooltipText);
    };

    const tooltipNotVisible = () => {
      expect(tooltipContent).not.toBeVisible();
    };

    tooltipVisible();

    // NB: Don't use `styleColor` inside of the `waitFor` block
    // as it uses the DOM to determine the color, and thus will cause a failing
    // `waitFor` to hang forever
    const baseColor = styleColor(args.color);
    const focusColor = styleColor(args.focusColor);
    const activeColor = styleColor(args.activeColor);
    const buttonColor = () => window.getComputedStyle(button).color;
    const buttonCursor = () => window.getComputedStyle(button).cursor;

    await userEvent.unhover(button);
    await waitFor(tooltipNotVisible);

    await userEvent.click(button);
    expect(buttonColor()).toBe(focusColor);
    tooltipVisible();

    button.blur();
    args.tooltipOnHover = false;
    await userEvent.hover(button);
    expect(tooltipNotVisible);

    args.tooltipOnClick = true;
    await userEvent.click(button);
    expect(tooltipVisible);

    args.tooltipOnClick = false;
    args.tooltipOnFocus = true;
    button.blur();
    button.focus();
    expect(tooltipVisible);

    args.tooltipOnFocus = false;
    button.blur();
    await userEvent.click(button);
    expect(tooltipNotVisible);
    await userEvent.hover(button);
    expect(tooltipNotVisible);
    await userEvent.unhover(button);

    args.modelValue = true;
    await waitFor(() => {
      expect(buttonColor()).toBe(activeColor);
    });
    
    args.modelValue = false;
    button.blur();
    await waitFor(() => {
      expect(buttonColor()).toBe(baseColor);
    });

    args.disabled = true;
    await userEvent.hover(button);
    await waitFor(() => {
      expect(buttonCursor()).toBe("not-allowed");
    });

    args.disabled = false;
    await waitFor(() => {
      expect(buttonCursor()).toBe("pointer");
    });
  },
};
