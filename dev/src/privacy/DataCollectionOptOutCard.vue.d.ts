declare const __VLS_export: import('vue').DefineComponent<{
    show: boolean;
    showPrivacyPolicy: boolean;
    responseOptOut: boolean | null;
}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:responseOptOut": (value: boolean | null) => any;
    "update:show": (value: boolean) => any;
    "update:showPrivacyPolicy": (value: boolean) => any;
}, string, import('vue').PublicProps, Readonly<{
    show: boolean;
    showPrivacyPolicy: boolean;
    responseOptOut: boolean | null;
}> & Readonly<{
    "onUpdate:responseOptOut"?: ((value: boolean | null) => any) | undefined;
    "onUpdate:show"?: ((value: boolean) => any) | undefined;
    "onUpdate:showPrivacyPolicy"?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
