/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3-vite";
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
  args: {
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
  },
  play: async ({ args, canvasElement }) => {
    args.disabled = false;
    args.modelValue = false;
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.hover(button);
    const tooltip = document.querySelector(".v-tooltip");
    const tooltipContent = tooltip.querySelector(".v-overlay__content");
    let buttonStyle = window.getComputedStyle(button);
    expect(tooltipContent).toBeVisible();
    expect(tooltipContent).toHaveTextContent(args.tooltipText);

    // await userEvent.unhover(button);
    // await waitFor(() => {
    //   expect(tooltipContent).not.toBeVisible();
    // });

    // await userEvent.click(button);
    // buttonStyle = window.getComputedStyle(button);
    // expect(buttonStyle.color).toBe(styleColor(args.focusColor));

    args.modelValue = true;
    await waitFor(() => {
      buttonStyle = window.getComputedStyle(button);
      expect(buttonStyle.color).toBe(styleColor(args.activeColor));
    });
    
    args.modelValue = false;
    await waitFor(() => {
      buttonStyle = window.getComputedStyle(button);
      expect(buttonStyle.color).toBe(styleColor(args.color));
    });

    args.disabled = true;
    await userEvent.hover(button);
    await waitFor(async () => {
      buttonStyle = window.getComputedStyle(button);
      expect(buttonStyle.cursor).toBe("not-allowed");
    });

    args.disabled = false;
    await waitFor(() => {
      buttonStyle = window.getComputedStyle(button);
      expect(buttonStyle.cursor).toBe("pointer");
    });
  },
};
