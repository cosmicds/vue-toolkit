import { VNode } from 'vue';
import { WwtHUDProps } from '../types';
type __VLS_Slots = {
    /** A slot for displaying extra WWT content below the default HUD content. This slot has access to the WWT store passed in via the component props. */
    default(props: WwtHUDProps): VNode[];
};
declare const __VLS_base: import('vue').DefineComponent<WwtHUDProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<WwtHUDProps> & Readonly<{}>, {
    location: import('..').HUDLocation;
    backgroundColor: string | null;
    offsetCenter: {
        x: number;
        y: number;
    };
    otherVariables: object;
    fontSize: string;
    textShadow: string | null;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
