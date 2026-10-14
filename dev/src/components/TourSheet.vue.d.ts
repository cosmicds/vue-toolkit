import { TourSheetProps } from '../types';
declare const __VLS_export: <T extends import('../composables/tour').BaseTourStepContent>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import('vue').PublicProps & __VLS_PrettifyLocal<TourSheetProps<T> & {
        onClose?: (() => any) | undefined;
        onNext?: (() => any) | undefined;
        onPrevious?: (() => any) | undefined;
        onStep?: ((index: number) => any) | undefined;
        onLeave?: (() => any) | undefined;
    } & Partial<import('vue').HTMLAttributes & import('vue').ReservedProps>> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
        default?: (props: {
            step: T;
        }) => any;
    } & {
        controls?: (props: {
            step: T;
            props: Readonly<{
                tour: import('..').Tour<T>;
                smallSize: boolean;
            }> & {
                readonly showBreadcrumbs: boolean;
                readonly showNextOnLastStep: boolean;
                readonly showBackOnFirstStep: boolean;
                readonly nextText: string;
                readonly backText: string;
                readonly disableNext: boolean;
                readonly disablePrevious: boolean;
                readonly showClose: boolean;
                readonly showControls: boolean;
                readonly accentColor: string;
                readonly borderColor: string;
                readonly backgroundColor: string;
                readonly textColor: string;
                readonly fontSize: string;
            } & {
                readonly smallSize: boolean;
                readonly showBreadcrumbs: boolean;
                readonly showNextOnLastStep: boolean;
                readonly showBackOnFirstStep: boolean;
                readonly disableNext: boolean;
                readonly disablePrevious: boolean;
                readonly showClose: boolean;
                readonly showControls: boolean;
            };
        }) => any;
    };
    emit: {
        (e: "previous" | "next" | "leave" | "close"): void;
        (e: "step", index: number): void;
    };
}>) => import('vue').VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_PrettifyLocal<T> = (T extends any ? {
    [K in keyof T]: T[K];
} : {
    [K in keyof T as K]: T[K];
}) & {};
