declare var __VLS_20: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_20) => any;
};
declare const __VLS_base: import('vue').DefineComponent<{
    modelValue: boolean;
    responseOptOut: boolean | null;
}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
    "update:responseOptOut": (value: boolean | null) => any;
}, string, import('vue').PublicProps, Readonly<{
    modelValue: boolean;
    responseOptOut: boolean | null;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onUpdate:responseOptOut"?: ((value: boolean | null) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
