declare function share(): void;
declare var __VLS_8: {
    onClick: typeof share;
};
type __VLS_Slots = {} & {
    activator?: (props: typeof __VLS_8) => any;
};
declare const __VLS_base: import('vue').DefineComponent<{
    source?: (() => string) | string;
    buttonColor?: string;
    iconColor?: string;
    elevation?: string | number;
    size?: string;
    rounded?: string | number;
    tooltip?: boolean;
    tooltipText?: string;
    alert?: boolean;
    alertText?: string;
    ariaLabel?: string;
}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    share: () => any;
}, string, import('vue').PublicProps, Readonly<{
    source?: (() => string) | string;
    buttonColor?: string;
    iconColor?: string;
    elevation?: string | number;
    size?: string;
    rounded?: string | number;
    tooltip?: boolean;
    tooltipText?: string;
    alert?: boolean;
    alertText?: string;
    ariaLabel?: string;
}> & Readonly<{
    onShare?: (() => any) | undefined;
}>, {
    source: string | (() => string);
    size: string;
    tooltip: boolean;
    ariaLabel: string;
    rounded: string | number;
    elevation: string | number;
    tooltipText: string;
    iconColor: string;
    buttonColor: string;
    alert: boolean;
    alertText: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
