import { VNode } from 'vue';
import { VTooltip } from 'vuetify/components/VTooltip';
import { IconButtonProps } from '../types';
type __VLS_Slots = {
    /** Allows configuration of the button content, which by default is simply the button icon */
    button(): VNode[];
};
declare const __VLS_base: import('vue').DefineComponent<IconButtonProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (active: boolean) => any;
    activate: () => any;
}, string, import('vue').PublicProps, Readonly<IconButtonProps> & Readonly<{
    "onUpdate:modelValue"?: ((active: boolean) => any) | undefined;
    onActivate?: (() => any) | undefined;
}>, {
    color: string;
    disabled: boolean;
    border: boolean;
    backgroundColor: string;
    activeColor: string;
    focusColor: string;
    longPressTimeMs: number;
    tooltipLocation: import('vue').ExtractPublicPropTypes<typeof VTooltip>["location"];
    tooltipOnClick: boolean;
    tooltipOnFocus: boolean;
    tooltipOnHover: boolean;
    tooltipOffset: string | number;
    showTooltip: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
