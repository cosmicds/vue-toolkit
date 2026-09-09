import { VNode } from 'vue';
import { DateTimePickerProps } from '../types';
type __VLS_Slots = {
    /** A slot for adding additional content below the datetime picker. */
    default(): VNode[];
    /** A slot for adding additional content at the top-middle of the picker */
    top(): VNode[];
    /** A slot for adding additional content at the center-middle of the picker */
    center(): VNode[];
    /** A slot for adding additional content at the bottom-middle of the picker */
    bottom(): VNode[];
};
declare const __VLS_base: import('vue').DefineComponent<DateTimePickerProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (datetime: Date) => any;
}, string, import('vue').PublicProps, Readonly<DateTimePickerProps> & Readonly<{
    "onUpdate:modelValue"?: ((datetime: Date) => any) | undefined;
}>, {
    debug: boolean;
    accentColor: string;
    useAmPm: boolean;
    editableTime: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
