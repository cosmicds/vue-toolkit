import { VNode } from 'vue';
import { Place } from '@wwtelescope/engine';
import { GalleryProps } from '../types';
type __VLS_Slots = {
    /** A slot allowing customization of what is shown when the gallery is closed. This slot has access to the component's list of places and selected place(s).*/
    closed(props: {
        places: Place[];
        selectedPlace: Place | null;
        selectedPlaces: Place[];
    }): VNode[];
};
declare const __VLS_base: import('vue').DefineComponent<GalleryProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    select: (place: Place) => any;
    deselect: (place: Place) => any;
    listAllSelected: (places: Place[]) => any;
}, string, import('vue').PublicProps, Readonly<GalleryProps> & Readonly<{
    onSelect?: ((place: Place) => any) | undefined;
    onDeselect?: ((place: Place) => any) | undefined;
    onListAllSelected?: ((places: Place[]) => any) | undefined;
}>, {
    width: string;
    maxHeight: string;
    title: string;
    columns: number | string;
    selectedColor: string;
    singleSelect: boolean;
    highlightLastOnly: boolean;
    previewIndex: number;
    closedText: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
