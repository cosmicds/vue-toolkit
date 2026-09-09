import { Thumbnail } from '@wwtelescope/engine-types';
import { FolderViewProps, ItemSelectionType } from '../types';
declare function toggleExpanded(): void;
declare function selectItem(item: Thumbnail, type: ItemSelectionType): void;
declare var __VLS_1: {
    expanded: boolean;
    toggleExpanded: typeof toggleExpanded;
}, __VLS_3: {
    item: Thumbnail;
    lastSelectedItem: Thumbnail | null;
    selectItem: typeof selectItem;
};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_1) => any;
} & {
    item?: (props: typeof __VLS_3) => any;
};
declare const __VLS_base: import('vue').DefineComponent<FolderViewProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    select: (data: {
        item: Thumbnail;
        type: ItemSelectionType;
    }) => any;
}, string, import('vue').PublicProps, Readonly<FolderViewProps> & Readonly<{
    onSelect?: ((data: {
        item: Thumbnail;
        type: ItemSelectionType;
    }) => any) | undefined;
}>, {
    orientation: "row" | "column";
    gap: string;
    backgroundColor: string;
    thumbnailColor: string;
    highlightColor: string;
    textColor: string;
    startExpanded: boolean;
    selectFirst: boolean;
    defaultThumbnail: string;
    lazy: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
