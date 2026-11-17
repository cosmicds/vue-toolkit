import { VNode } from 'vue';
import { DraggableItemsProps } from '../types';
declare const __VLS_export: <T>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import('vue').PublicProps & __VLS_PrettifyLocal<(DraggableItemsProps<T> & {
        modelValue: T[];
    }) & {
        onChange?: ((order: T[]) => any) | undefined;
        "onUpdate:modelValue"?: ((value: T[]) => any) | undefined;
    } & Partial<NonNullable<Partial<{
        move: Function;
        tag: string;
        clone: Function;
        list: unknown[];
        modelValue: unknown[];
        componentData: Record<string, any>;
    }> & Omit<{
        readonly move: Function;
        readonly tag: string;
        readonly clone: Function;
        readonly list: unknown[];
        readonly modelValue: unknown[];
        readonly componentData: Record<string, any>;
        readonly itemKey?: (string | Function) | undefined;
    } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, "modelValue" | "tag" | "clone" | "list" | "move" | "componentData"> & Record<string, unknown>>>> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
        handle?(props: {
            item: T;
        }): VNode[];
        item(props: {
            item: T;
        }): VNode[];
    };
    emit: ((event: "change", order: T[]) => void) & ((event: "update:modelValue", value: T[]) => void);
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
